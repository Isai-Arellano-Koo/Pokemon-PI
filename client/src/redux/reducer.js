

const initialState = {
  pokemons: [],
  pokemonsTotales: [],
  pokemonsOrderDefault: [],
  pokemonsDB: [],
  dataOrigin: { origin: "ALL" },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POKEMON":
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        pokemonsOrderDefault: [...state.pokemonsOrderDefault, action.payload],
        pokemonsTotales: [...state.pokemonsTotales, action.payload],
      };

    case "ADD_POKEMON_FRONT":
      return {
        ...state,
        pokemons: [action.payload, ...state.pokemons],
        pokemonsOrderDefault: [action.payload, ...state.pokemonsOrderDefault],
        pokemonsTotales: [...state.pokemonsTotales, action.payload],
      };

    case "ORDER":
      const { payload } = action;

      const allPokemonsForOrder = [...state.pokemons];

      if (action.payload === "default") {
        if(state.dataOrigin.origin === "DB") {
            return {...state, pokemons: state.pokemonsDB}
        } else if(state.dataOrigin.origin === "API") {
            const pokemonsFromAPI = state.pokemonsOrderDefault.filter((pokemon) => {
                const idNotInDB = !state.pokemonsDB.some(
                  (pokemonDB) => pokemonDB.id === pokemon.id
                );
                return idNotInDB;
              });
            return {...state, pokemons: pokemonsFromAPI}
        } else if(state.dataOrigin.origin === "ALL") {
            return { ...state, pokemons: state.pokemonsTotales };
        }
        
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
      let filteredPokemons = [];
      if (action.payload === "ALL") {
        if (state.dataOrigin.origin === "DB") {
          filteredPokemons = state.pokemonsDB;
        } else if (state.dataOrigin.origin === "API") {
          filteredPokemons = state.pokemonsOrderDefault.filter((pokemon) => {
            const idNotInDB = !state.pokemonsDB.some(
              (pokemonDB) => pokemonDB.id === pokemon.id
            );
            return idNotInDB;
          });
        } else if (state.dataOrigin.origin === "ALL") {
          filteredPokemons = state.pokemonsTotales
        }
      } else {
        if (state.dataOrigin.origin === "DB") {
          filteredPokemons = state.pokemonsDB.filter((pokemon) =>
            pokemon.types.some((type) => type.name === action.payload)
          );
        } else if (state.dataOrigin.origin === "ALL") {
          filteredPokemons = state.pokemonsTotales.filter((pokemon) =>
            pokemon.types.some((type) => type.name === action.payload)
          );
        } else if (state.dataOrigin.origin === "API") {
          const pokemonsFromAPI = state.pokemonsOrderDefault.filter(
            (pokemon) => {
              const idNotInDB = !state.pokemonsDB.some(
                (pokemonDB) => pokemonDB.id === pokemon.id
              );
              return idNotInDB;
            }
          );
          filteredPokemons = pokemonsFromAPI.filter((pokemon) =>
            pokemon.types.some((type) => type.name === action.payload)
          );
        }
      }

      return {
        ...state,
        pokemons: filteredPokemons,
      };

    case "ADD_POKEMONS_DB_ARRAY":
      return {
        ...state,
        pokemonsDB: action.payload,
      };

    case "POKEMONS_DB":
      return {
        ...state,
        pokemons: state.pokemonsDB,
        dataOrigin: { origin: "DB" },
      };

    case "POKEMONS_API":
      const pokemonsFromAPI = state.pokemonsOrderDefault.filter((pokemon) => {
        const idNotInDB = !state.pokemonsDB.some(
          (pokemonDB) => pokemonDB.id === pokemon.id
        );
        return idNotInDB;
      });
      return {
        ...state,
        pokemons: pokemonsFromAPI,
        dataOrigin: { origin: "API" },
      };

    case 'ALL_POKEMONS':
      return {
        ...state,
        pokemons: state.pokemonsTotales,
        dataOrigin:{ origin: "ALL" }
      }

    default:
      return { ...state };
  }
};

export default rootReducer;
