const { Pokemon } = require('../db')

const postPokemons = async (req, res) => {
    const { id, name, image, health, attack, defense, speed, height, weight  } = req.body

    if(!id || !name || !image || !health || !attack || !defense) {
        res.status(401).json({message: "Faltan Datos Obligatorios"})
    }
}

module.exports = postPokemons;

