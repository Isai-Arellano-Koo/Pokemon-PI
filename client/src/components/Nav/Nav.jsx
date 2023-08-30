import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import style from './Nav.module.css'

const Nav = ({onSearch}) => {
  const location = useLocation()
  return (
    <nav className={style.nav}>
      <SearchBar onSearch={onSearch}/>
      <Link to='/create'>Crear Pokemon</Link>
      <Link to='/home'>Home</Link>
    </nav>
  );
};

export default Nav;
