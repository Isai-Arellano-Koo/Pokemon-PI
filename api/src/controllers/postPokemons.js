const { Pokemon } = require("../db");

const postPokemons = async (req, res) => {
  const { id, name, image, health, attack, defense, speed, height, weight, types } =
    req.body;

  if (!id || !name || !image || !health || !attack || !defense) {
    res.status(401).json({ message: "Faltan Datos Obligatorios" });
    return;
  }

  try {
    await Pokemon.create({
        id, name, image, health, attack, defense, speed, height, weight, types
    })

    

    const PokemonCreado = await Pokemon.findOne({where: {id: id}})

    await PokemonCreado.addTypes(types)
    
    res.status(200).json(PokemonCreado)
  } catch (error) {
    res.status(500).json({message: 'error en el intento de crear un personaje', error: error.message})
  }
};

module.exports = postPokemons;
