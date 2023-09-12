import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import style from './FiltersType.module.css'
import { filterCards } from '../../redux/actions'

const FiltersType = () => {
  const dispatch = useDispatch()
  const [types, setTypes] = useState([])

  useEffect(() => {
    axios('/types').then(({data}) => {
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
     if(e.target.value === 'All') {
      dispatch(filterCards("ALL"))
    } else {
      dispatch(filterCards(e.target.value))
    }
  }

  
 
  return (
    <div>
    <p>Filter:</p>
      <select className={style.select} onChange={handleFilter} defaultValue=''>
      <option value='' disabled>--Select</option>
      <option value='All'>All</option>
        {types.map((type) => <option className={style.options} key={type.id} value={type.name}>{type.name}</option>)}
      </select>

    </div>
  )
}

export default FiltersType