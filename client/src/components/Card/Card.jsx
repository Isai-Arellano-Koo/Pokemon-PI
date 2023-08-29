import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ image, name, types }) => {
  return (
    <div className={style.cardContainer}>
      <Link className={style.name} to={`/detail/${name}`}>
        <h2>{name}</h2>
      </Link>

      <Link to={`/detail/${name}`}>
        <img className={style.imagePokemon} src={image} alt={name} />
      </Link>
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
    </div>
  );
};

{
  /* <div className={style.typesContainer}>
  {types?.map((type) => (
    <div className={style.typesDiv}>
      <span
        className={`${style[type.name]} ${style.types}`}
        key={type.name}
      ></span>
    </div>
  ))}
</div>; */
}

export default Card;
