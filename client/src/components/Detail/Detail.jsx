import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios(`/pokemons/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setPokemon(data);
        } else {
          window.alert("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => setPokemon({});
  }, [name]);
  return (
    <div>
      <div className={style.detail}>
        <div className={style.infoContainer}>
          <div className={style.imageContainer}>
            <h2 className={style.name}>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <div className={style.typesContainer}>
              {pokemon.types?.map((type) => (
                <div key={type.name}>
                  <div className={style.typesDiv}>
                    <span
                      className={`${style[type.name]} ${style.types}`}
                    ></span>
                  </div>
                  <p className={style.nameType}>{type.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={style.info}>
            <h2>HEALTH | {pokemon.health}</h2>
            <h2>ATTACK | {pokemon.attack}</h2>
            <h2>DEFENSE | {pokemon.defense}</h2>
            <h2>SPEED | {pokemon.speed}</h2>
            <h2>HEIGHT | {pokemon.height}</h2>
            <h2>WEIGHT | {pokemon.weight}</h2>
          </div>
        </div>

        
      </div>

      <button className={style.buttonBack} onClick={() => navigate(-1)}>
          Volver
        </button>
    </div>
  );
};

export default Detail;
