import { useState } from "react";
import style from "./Cards.module.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Order from "../Order/Order";
import FiltersType from "../Filters/FiltersType";
import FiltersOrigin from "../FiltersOrigin/FiltersOrigin";

const Cards = ({ pokemons }) => {
  const [page, setPage] = useState(1);
  const [toPage, setToPage] = useState(12);
  const max = Math.ceil(pokemons?.length / toPage);

  return (
    <>
      <Pagination page={page} setPage={setPage} max={max} />
      <div className={style.cards}>
        <div className={style.filterOrderDiv}>
          <Order />
          <FiltersType />
          <FiltersOrigin />
        </div>

        <div className={style.cardsContainer}>
          {pokemons
            ?.slice((page - 1) * toPage, (page - 1) * toPage + toPage)
            .map((pokemon) => {
              return (
                <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  image={pokemon.image}
                  name={pokemon.name}
                  attack={pokemon.attack}
                  types={pokemon.types}
                />
              );
            })}
        </div>
      </div>
      <Pagination page={page} setPage={setPage} max={max} />
    </>
  );
};

export default Cards;
