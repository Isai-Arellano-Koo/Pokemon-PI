import { useDispatch } from "react-redux"
import { orderCards } from "../../redux/actions"
import style from "./Order.module.css"

const Order = () => {
    const dispatch = useDispatch()

    const handleOrder = (e) => {
            dispatch(orderCards(e.target.value))
    }
  return (
    <div>
        <p>Order: </p>
        <div>
            <select className={style.select} onChange={handleOrder} defaultValue=''>
                <option value="" disabled>--Select</option>
                <option value='default'>Default</option>
                <option value="A-Z"> A-Z </option>
                <option value='Z-A'> Z-A </option>
                <option value="MAS_ATAQUE"> + Ataque </option>
                <option value='MENOS_ATAQUE'> - Ataque </option>
            </select>
        </div>
    </div>
  )
}

export default Order