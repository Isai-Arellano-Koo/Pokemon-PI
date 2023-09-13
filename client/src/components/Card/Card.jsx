import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import silueta from '../../images/silueta.webp'

const Card = ({ image, name, types }) => {

  const isImageValid = (url) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth > 0;
  };

  const isValidImage = isImageValid(image);

  return (
    <Link to={`/detail/${name}`} className={style.cardContainer}>
      <div className={style.name}>
        <h2>{name}</h2>
      </div>

      <div>
       {isValidImage ? (
          <img className={style.imagePokemon} src={image} alt={name} />
        ) : (
          <img className={style.imagePokemon} src={silueta} alt="Silueta" />
        )}
      </div>
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

