import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Form.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPokemon } from "../../redux/actions";
import { validation } from "./validation";

const Form = () => {
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [typesActive, setTypeActive] = useState([]);
  const [dataForm, setDataForm] = useState({
    name: "",
    image: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios("/types")
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
    const { name, image, health, attack, defense, speed, height, weight } =
      dataForm;

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (
      !name ||
      !image ||
      !health ||
      !attack ||
      !defense ||
      typesActive.length === 0
    ) {
      window.alert("Faltan Datos Obligatorios");
    } else if (hasErrors) {
      window.alert("hay errores");
    } else {
      dispatch(
        createPokemon({
          name,
          image,
          health,
          attack,
          defense,
          speed: speed !== "" ? speed : null,
          height: height !== "" ? height : null,
          weight: weight !== "" ? weight : null,
          types: typesActive,
        })
      );
      window.alert("pokemon creado correctamente");
      navigate(-1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataForm({ ...dataForm, [name]: value });
    validation({ ...dataForm, [name]: value }, errors, setErrors);
  };

  const handleClick = (typeId) => {
    if (typesActive.length > 3) {
      if (typesActive.includes(typeId)) {
        const newArray = typesActive.filter((type) => type !== typeId);
        setTypeActive(newArray);
      }
      return;
    }
    if (typesActive.includes(typeId)) {
      const newArray = typesActive.filter((type) => type !== typeId);
      setTypeActive(newArray);
    } else {
      setTypeActive([...typesActive, typeId]);
    }
  };
  return (
    <div>
    <h1 className={style.titulo}>Crea tu Pokemon!</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.campos}>
          <div className={style.campo}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={dataForm.name}
              onChange={handleInputChange}
            />
            <span className={style.errors}>{errors.name}</span>
          </div>
          <div className={style.campo}>
            <label>Image:</label>
            <input
              type="text"
              name="image"
              value={dataForm.image}
              onChange={handleInputChange}
            />
            <span className={style.errors}>{errors.image}</span>
          </div>
          <div className={style.campo}>
            <label>HP: </label>
            <input
              type="text"
              name="health"
              value={dataForm.health}
              onChange={handleInputChange}
            />
            <span className={style.errors}>{errors.health}</span>
          </div>
          <div className={style.campo}>
            <label>Attack: </label>
            <input
              type="text"
              name="attack"
              value={dataForm.attack}
              onChange={handleInputChange}
            />
            <span className={style.errors}>{errors.attack}</span>
          </div>
          <div className={style.campo}>
            <label>Defense: </label>
            <input
              type="text"
              name="defense"
              value={dataForm.defense}
              onChange={handleInputChange}
            />
            <span className={style.errors}>{errors.defense}</span>
          </div>
          <div className={style.campo}>
            <label>Speed: </label>
            <input
              type="text"
              name="speed"
              value={dataForm.speed}
              onChange={handleInputChange}
            />
            <span className={style.errors}>{errors.speed}</span>
          </div>
          <div className={style.campo}>
            <label>Height: </label>
            <input
              type="text"
              name="height"
              value={dataForm.height}
              onChange={handleInputChange}
            />
            <span className={style.errors}>{errors.height}</span>
          </div>
          <div className={style.campo}>
            <label>Weight: </label>
            <input
              type="text"
              name="weight"
              value={dataForm.weight}
              onChange={handleInputChange}
            />
            <span className={style.errors}>{errors.weight}</span>
          </div>
        </div>

        <div className={style.typesContainer}>
          {types?.map((type) => (
            <button
              type="button"
              className={ `${typesActive.includes(type.id) ? style.active : ''} ${style.buttonTypes}`
              }
              onClick={() => handleClick(type.id)}
              key={type.name}
            >
              <div className={style.typesDiv}>
                <span className={`${style[type.name]} ${style.types}`}></span>
              </div>
              <p className={style.nameType}>{type.name}</p>
            </button>
          ))}
        </div>

        <button className={style.buttonSubmit} type="submit">Crear Pokémon!</button>
      </form>
    </div>
  );
};

export default Form;
