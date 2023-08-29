import axios from "axios";

export const addPokemon = (pokemons) => {
    return {
        type: "ADD_POKEMON",
        payload: pokemons
    }

}

export const addPokemonFront = (pokemons) => {
    return {
        type: "ADD_POKEMON_FRONT",
        payload: pokemons
    }
}

export const orderCards = (order) => {
    return {
        type: "ORDER", payload: order
    }
}

export const filterCards = (type) => {
    return {
        type: "FILTER",
        payload: type
    }
}

