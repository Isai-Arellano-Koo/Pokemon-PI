const initialState = {
  pokemons: [],
  pokemonsOrderDefault: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POKEMON":
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        pokemonsOrderDefault: [...state.pokemonsOrderDefault, action.payload],
      };

    case "ADD_POKEMON_FRONT":
      return {
        ...state,
        pokemons: [action.payload, ...state.pokemons],
        pokemonsOrderDefault: [action.payload, ...state.pokemonsOrderDefault],
      };

    case "ORDER":
      const { payload } = action;

      const allPokemonsForOrder = [...state.pokemons];

      if (action.payload === "default") {
        return { ...state, pokemons: state.pokemonsOrderDefault };
      } else if (payload === "MAS_ATAQUE") {
        allPokemonsForOrder.sort((a, b) => b.attack - a.attack);
      } else if (payload === "MENOS_ATAQUE") {
        allPokemonsForOrder.sort((a, b) => a.attack - b.attack);
      } else if (payload === "A-Z") {
        allPokemonsForOrder.sort((a, b) => a.name.localeCompare(b.name));
      } else allPokemonsForOrder.sort((a, b) => b.name.localeCompare(a.name));

      return {
        ...state,
        pokemons: allPokemonsForOrder,
      };

    case "FILTER":
      const filteredPokemons = state.pokemonsOrderDefault.filter((pokemon) =>
        pokemon.types.some((type) => type.name === action.payload)
      );

      return {
        ...state,
        pokemons: filteredPokemons,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
