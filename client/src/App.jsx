import './App.css';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import Cards from './components/Cards/Cards';
import { useState } from 'react';




function App() {
  const [pokemons, setPokemons] = useState([])


  const onSearch = async (name) => {
    try {
        const response = await axios(`http://localhost:3001/pokemons?name=${name}`)
  
        const data = response.data;
        setPokemons((oldPokemons) => [data, ...oldPokemons])
    } catch (error) {
        console.log(error.message)
    }
  }
  return (
    <div className="App">
    <Nav onSearch={onSearch}/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Cards pokemons={pokemons}/>}/>
      </Routes>
    </div>
  );
}

export default App;
