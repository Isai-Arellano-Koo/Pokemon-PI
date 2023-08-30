import "./App.css";
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import Cards from "./components/Cards/Cards";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPokemon, addPokemonFront, addToPokemonDB } from "./redux/actions";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";

function App() {
  const pokemons = useSelector(state => state.pokemons);
  const dispatch = useDispatch();
  const location = useLocation()


  // * Agregar los pokemons iniciales
  useEffect(() => {
    axios("http://localhost:3001/pokemons").then(({ data }) => {
      data.map(poke => dispatch(addPokemon(poke)))
    }).catch(error => {
      console.log(error)
    })
  }, []);

  //* Agregar los pokemons de la base de datos a redux

  useEffect(() => {
    dispatch(addToPokemonDB())
  }, [pokemons])

  const onSearch = async (name) => {
    try {
      const response = await axios(
        `http://localhost:3001/pokemons?name=${name}`
      );

      const data = response.data;
      if(data.name && !pokemons.find(pokemon => pokemon.name === name)) {
        dispatch(addPokemonFront(data))
      } else {
        window.alert('Personaje Repetido')
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
    {location.pathname !== '/detail/:name' ?  <Nav onSearch={onSearch} /> : null}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Cards pokemons={pokemons} />} />
        <Route path="/detail/:name" element={<Detail/>} />
        <Route path="/create" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
