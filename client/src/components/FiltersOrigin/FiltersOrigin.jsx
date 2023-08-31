import { useDispatch } from 'react-redux'
import { orderCards, pokemonsApi, pokemonsDB } from '../../redux/actions'


const FiltersOrigin = () => {
    const dispatch = useDispatch()

    const handleFilter = (e) => {
        if(e.target.value === 'DATABASE') {
          dispatch(pokemonsDB())
        } else if (e.target.value === 'API') {
          dispatch(pokemonsApi())
        } else if(e.target.value === 'AllBaseDeDatos') {
          dispatch(orderCards('default'))
        } 
      }

  return (
    <div>
        <p>Filtro base de datos: </p>
      <select onChange={handleFilter}>
        <option>---Select</option>
        <option value='AllBaseDeDatos' >All</option>
        <option value='API'>API</option>
        <option value='DATABASE'>DATABASE</option>
      </select>

    </div>
  )
}

export default FiltersOrigin