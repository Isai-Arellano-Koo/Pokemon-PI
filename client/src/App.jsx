import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import Cards from "./components/Cards/Cards";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPokemon, addPokemonFront, addToPokemonDB } from "./redux/actions";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import axios from "axios";
axios.defaults.baseURL = 'https://pokemon-pi-production-214f.up.railway.app'

function App() {
  const pokemons = useSelector(state => state.pokemons);
  const dispatch = useDispatch();
  const location = useLocation()


  // * Agregar los pokemons iniciales
  useEffect(() => {
    axios("/pokemons").then(({ data }) => {
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
        `/pokemons?name=${name}`
      );

      const data = response.data;
      if(data.name && !pokemons.find(pokemon => pokemon.name === name)) {
        dispatch(addPokemonFront(data))
      } else {
        window.alert('Personaje Repetido')
      }
      
    } catch (error) {
      window.alert('Pokemon no encontrado');
    }
  };

  return (
    <div className="App">
    {location.pathname !== '/' ? !location.pathname.startsWith('/detail/') ? <Nav onSearch={onSearch} /> : null : null}
      
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
