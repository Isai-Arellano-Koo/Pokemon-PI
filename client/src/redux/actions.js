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

export const pokemonsDB = () => {
  return async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/db");
      const data = response.data;
      return dispatch({
        type: "POKEMONS_DB",
        payload: data,
      });
    } catch (error) {
        console.log(error)
    }
  };
};

export const addToPokemonDB = () => {

     return async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/db");
      const data = response.data;
      return dispatch({
        type: "ADD_POKEMONS_DB_ARRAY",
        payload: data,
      });
    } catch (error) {
        console.log(error)
    }
  };
};

export const pokemonsApi = () => {
    return {
        type: 'POKEMONS_API'
    }
}
