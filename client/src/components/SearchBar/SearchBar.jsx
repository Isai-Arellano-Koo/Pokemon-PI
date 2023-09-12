import { useState } from "react"
import style from './SearchBar.module.css'


const SearchBar = ({onSearch}) => {
    const [name, setName] = useState('')

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const handleSearch = () => {
        const inputName = document.getElementById('inputName');
        onSearch(inputName.value)
        setName(inputName.value)
        inputName.value = ''
    }

  return (
    <div className={style.searchBar}>
    <input onKeyDown={handleKeyPress} className={style.inputSearch} id='inputName' type='search'/>
        <button type='submit' className={style.boton} onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default SearchBar