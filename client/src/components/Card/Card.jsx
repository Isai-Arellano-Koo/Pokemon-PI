import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, image, name, types, attack }) => {
  return (
    <Link to={`/detail/${id}`} className={style.cardContainer}>
      <div className={style.name}>
        <h2>{name}</h2>
      </div>

      <div>
        <img className={style.imagePokemon} src={image} alt={name} />
      </div>
      <p>Attack: {attack}</p>
      <div className={style.typesContainer}>
        {types?.map((type) => (
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
    </Link>
  );
};


export default Card;
