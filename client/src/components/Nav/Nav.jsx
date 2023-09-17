import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logopokemon.webp";
import style from "./Nav.module.css";

const Nav = ({ onSearch }) => {
  const location = useLocation()
  return (
    <nav className={style.nav}>
      <Link to='/'>
        <img src={logo} alt="logo-pokemon" className={style.logo} />
      </Link>

      <Link to="/home">Home</Link>
      {location.pathname !== '/create' ? <SearchBar onSearch={onSearch} /> : null}
      
      {location.pathname !== '/create' ? <Link className={style.crearPokemon} to="/create">Crear Pokemon</Link> : null}
      
    </nav>
  );
};

export default Nav;
