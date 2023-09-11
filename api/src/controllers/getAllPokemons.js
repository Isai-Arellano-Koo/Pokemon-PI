const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon, Type } = require('../db')

const getAllPokemons = async (req, res) => {
  try {
    const pokemonFromDb = await Pokemon.findAll({
      include: [
        {
          model: Type,
        }
      ]
    });

    const response = await axios(`${URL}?limit=50`);
    const allPokemons = response.data;

    const pokemonsPromises = allPokemons.results.map(async (pokemon) => {
      const response = await axios(`${URL}/${pokemon.name}`);
      const poke = response.data;

      const attack = poke.stats.find((obj) => obj.stat.name === "attack");
      const defense = poke.stats.find((obj) => obj.stat.name === "defense");
      const hp = poke.stats.find((obj) => obj.stat.name === "hp");
      const speed = poke.stats.find((obj) => obj.stat.name === "speed");
      const types = poke.types.map(type => type.type)

      return {
        id: poke.id,
        name: poke.name,
        image: poke.sprites.other.home.front_default,
        health: hp.base_stat,
        attack: attack.base_stat,
        defense: defense.base_stat,
        speed: speed.base_stat,
        height: poke.height,
        weight: poke.weight,
        types: types
      };
    });

    const pokemonsApi = await Promise.all(pokemonsPromises);

    const pokemons = [...pokemonFromDb, ...pokemonsApi]

    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al obtener al personaje",
      error: error.message,
    });
  }
};





module.exports =  getAllPokemons ;
