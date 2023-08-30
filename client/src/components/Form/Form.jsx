import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Form.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPokemon } from "../../redux/actions";

const Form = () => {
  const [types, setTypes] = useState([]);
  const [typesActive, setTypeActive] = useState([])
  const [dataForm, setDataForm] = useState({
    name: "",
    image: "",
    health: "",
    attack: "",
    defense: "",
    speed: '',
    height: '',
    weight: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    axios("http://localhost:3001/types")
      .then(({ data }) => {
        if (data) {
          setTypes(data);
        } else {
          window.alert("Error al obtener la data");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, image, health, attack, defense, speed, height, weight} = dataForm;
    if(!name || !image || !health || !attack || !defense){
        window.alert('Faltan Datos Obligatorios')
    } else {
        dispatch(createPokemon({
            name,
            image,
            health,
            attack,
            defense,
            speed: speed !== "" ? speed : null,
            height: height !== "" ? height : null,
            weight: weight !== "" ? weight : null,
            types: typesActive
        }))
        window.alert('pokemon creado correctamente')
        navigate(-1)
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target

    setDataForm({...dataForm, [name]: value})
  }

  const handleClick = (typeId) => {
    if(typesActive.includes(typeId)) {
        const newArray = typesActive.filter(type => type !== typeId)
        setTypeActive(newArray)
    } else {
        setTypeActive([...typesActive, typeId])
    }
}
  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={dataForm.name} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Image: </label>
          <input type="text" name="image" value={dataForm.image} onChange={handleInputChange}/>
        </div>
        <div>
          <label>HP: </label>
          <input type="text" name="health" value={dataForm.health} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Attack: </label>
          <input type="text" name="attack" value={dataForm.attack} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Defense: </label>
          <input type="text" name="defense" value={dataForm.defense} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Speed: </label>
          <input type="text" name='speed' value={dataForm.speed} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Height: </label>
          <input type="text" name="height" value={dataForm.height} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Weight: </label>
          <input type="text" name="weight" value={dataForm.weight} onChange={handleInputChange}/>
        </div>
        <div className={style.typesContainer}>
          {types?.map((type) => (
            <button type='button' className={typesActive.includes(type.id) ? `${style.active}` : null} onClick={() => handleClick(type.id)}  key={type.name}>
              <div className={style.typesDiv}>
                <span className={`${style[type.name]} ${style.types}`}></span>
              </div>
              <p className={style.nameType}>{type.name}</p>
            </button>
          ))}
        </div>

        <button type="submit">Crear Pokemon</button>
      </form>
    </div>
  );
};

export default Form;
