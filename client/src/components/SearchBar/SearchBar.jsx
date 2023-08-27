import { useState } from "react"


const SearchBar = ({onSearch}) => {
    const [name, setName] = useState('')

    const handleChange = () => {
        const inputName = document.getElementById('inputName');
        onSearch(inputName.value)
        setName(inputName.value)
        inputName.value = ''
    }

  return (
    <div>
    <input id='inputName' type='search'/>
        <button onClick={handleChange}>Agregar</button>
    </div>
  )
}

export default SearchBar