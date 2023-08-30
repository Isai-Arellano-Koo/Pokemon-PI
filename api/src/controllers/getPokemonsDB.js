const { Pokemon, Type } = require('../db')

const getPokemonBD = async(req, res) => {
    try {
        const pokemonsDB = await Pokemon.findAll({
            include: [
                {
                  model: Type,
                }
              ]
        })

          res.status(200).json(pokemonsDB)

    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener al personaje",
            error: error.message,
          });
    }
    
}
module.exports = getPokemonBD;