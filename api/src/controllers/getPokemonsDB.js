const { Pokemon } = require('../db')

const getPokemonBD = async(req, res) => {
    try {
        const pokemonsDB = await Pokemon.findAll()

    if (pokemonsDB) {
        const types = pokemonsDB.types.map((type) => {
          return {name: type.name}
        });
        const pokemonJSON = {
            id: pokemonsDB.id,
            name: pokemonsDB.name,
            image: pokemonsDB.image,
            health: pokemonsDB.health,
            attack: pokemonsDB.attack,
            defense: pokemonsDB.defense,
            speed: pokemonsDB.speed,
            height: pokemonsDB.height,
            weight: pokemonsDB.weight,
            types: types
          };
        
          res.status(200).json(pokemonJSON)
    }
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener al personaje",
            error: error.message,
          });
    }
    
}
module.exports = getPokemonBD;