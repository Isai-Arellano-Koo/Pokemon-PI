import axios from "axios";

export const addPokemon = (pokemons) => {
  return {
    type: "ADD_POKEMON",
    payload: pokemons,
  };
};

export const addPokemonFront = (pokemons) => {
  return {
    type: "ADD_POKEMON_FRONT",
    payload: pokemons,
  };
};

export const orderCards = (order) => {
  return {
    type: "ORDER",
    payload: order,
  };
};

export const filterCards = (type) => {
  return {
    type: "FILTER",
    payload: type,
  };
};

export const createPokemon = (newPokemon) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/pokemons",
        newPokemon
      );
      const data = response.data;
      dispatch({
        type: "ADD_POKEMON_FRONT",
        payload: data,
      });

    } catch (error) {
      console.log(error);
    }
  };
};

