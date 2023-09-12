import React from "react";
import { Link } from "react-router-dom";
import style from './Landing.module.css'
import logo from '../../images/logopokemon.webp'
import pokeball from '../../images/pokeball.webp'

const LandingPage = () => {
  return (
    <div className={style.landing}>
    <img className={style.image} src={logo}/>
      <Link className={style.homeButton} to='/home'>
      <img src={pokeball} className={style.imagePokeball}/>
        <h1>Atrápalos Ya!</h1>
      </Link>
    </div>
  );
};

export default LandingPage;
