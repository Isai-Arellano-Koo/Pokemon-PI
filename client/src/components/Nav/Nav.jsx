import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom";
import style from './Nav.module.css'

const Nav = ({onSearch}) => {
  const location = useLocation()
  return (
    <nav className={style.nav}>
      <SearchBar onSearch={onSearch}/>
    </nav>
  );
};

export default Nav;
