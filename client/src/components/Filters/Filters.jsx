import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import style from './Filters.module.css'
import { filterCards, orderCards } from '../../redux/actions'

const Filters = () => {
  const dispatch = useDispatch()
  const [types, setTypes] = useState([])

  useEffect(() => {
    axios('http://localhost:3001/types').then(({data}) => {
      if(data) {
        setTypes(data)
      } else {
        window.alert('Error al obtener la data')
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const handleFilter = (e) => {
    if(e.target.value === 'Alls') {
      dispatch(orderCards('default'))
    } else {
      dispatch(filterCards(e.target.value))
    }
  }
 
  return (
    <div>
    <p>Filter:</p>
      <select className={style.select} onChange={handleFilter} defaultValue=''>
      <option value='' disabled>--Select</option>
      <option value='Alls'>Alls</option>
        {types.map((type) => <option className={style.options} key={type.id} value={type.name}>{type.name}</option>)}
      </select>

    <p>Filtro base de datos: </p>
      <select onChange={handleFilter}>
        <option>---Select</option>
        <option value='API'>API</option>
        <option value='DATABASE'>DATABASE</option>
      </select>
    </div>
  )
}

export default Filters