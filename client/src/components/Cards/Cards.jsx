import { useState } from "react";
import style from "./Cards.module.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Order from "../Order/Order";
import Filters from "../Filters/Filters";

const Cards = ({ pokemons }) => {
  const [page, setPage] = useState(1);
  const [toPage, setToPage] = useState(12);
  const max = Math.ceil(pokemons?.length / toPage);

  return (
    <div>
      <Pagination page={page} setPage={setPage} max={max} />
      <Order/>
      <Filters pokemons = {pokemons}/>
      <div className={style.cardsContainer}>
        {pokemons
          ?.slice((page - 1) * toPage, (page - 1) * toPage + toPage)
          .map((pokemon) => {
            return (
              <Card
                key={pokemon.id}
                image={pokemon.image}
                name={pokemon.name}
                types={pokemon.types}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Cards;
