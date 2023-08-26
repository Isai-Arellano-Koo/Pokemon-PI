const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon, Type } = require('../db')

const getPokemonByName = async (req, res) => {
    try {
      const { name } = req.query;
  
      const pokemonFromDb = await Pokemon.findOne({
        where: {
          name: name.toLowerCase()
        },
        include: [
          {
            model: Type,
          }
        ]
      });
  
      if (pokemonFromDb) {
        const types = pokemonFromDb.types.map((type) => {
          return {name: type.name}
        });
        
        const pokemonJSON = {
          id: pokemonFromDb.id,
          name: pokemonFromDb.name,
          image: pokemonFromDb.image,
          health: pokemonFromDb.health,
          attack: pokemonFromDb.attack,
          defense: pokemonFromDb.defense,
          speed: pokemonFromDb.speed,
          height: pokemonFromDb.height,
          weight: pokemonFromDb.weight,
          types: types
        };
  
        return res.status(200).json(pokemonJSON);
      }
  
      const response = await axios(`${URL}/${name.toLowerCase()}`);
      const pokemon = response.data;
  
      const attack = pokemon.stats.find((obj) => obj.stat.name === "attack");
      const defense = pokemon.stats.find((obj) => obj.stat.name === "defense");
      const hp = pokemon.stats.find((obj) => obj.stat.name === "hp");
      const speed = pokemon.stats.find((obj) => obj.stat.name === "speed");
      const types = pokemon.types.map(type => type.type)
  
      const pokemonJSON = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        health: hp.base_stat,
        attack: attack.base_stat,
        defense: defense.base_stat,
        speed: speed.base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
        types: types
      };
  
      res.status(200).json(pokemonJSON);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error al obtener al personaje",
        error: error.message,
      });
    }
  };

  module.exports = getPokemonByName