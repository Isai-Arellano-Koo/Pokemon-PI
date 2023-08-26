const { Pokemon, Type } = require("../db");

const postPokemons = async (req, res) => {
  const { name, image, health, attack, defense, speed, height, weight, types } =
    req.body;

  if ( !name || !image || !health || !attack || !defense) {
    res.status(401).json({ message: "Faltan Datos Obligatorios" });
    return;
  }

  try {

    const [newPokemon, created] = await Pokemon.findOrCreate({where: { name: name.toLowerCase() }, 
        defaults: { image, health, attack, defense, speed, height, weight}
    })
    // await Pokemon.create({
    //     name, image, health, attack, defense, speed, height, weight, types
    // })

    // const PokemonCreado = await Pokemon.findOne({where: {name: name}})
    if (!created) {

        await newPokemon.update({
          image,
          health,
          attack,
          defense,
          speed,
          height,
          weight,
        });
      }

   if (types && Array.isArray(types)) {
      await newPokemon.setTypes(types);
    }
    
     // Obtén todas las propiedades de newPokemon usando el spread operator
     const responseJSON = {
        ...newPokemon.get(),
        types: types
          ? await Promise.all(types.map(typeId => Type.findByPk(typeId)))
          : [],
      };
  
      res.status(200).json(responseJSON);


  } catch (error) {
    res.status(500).json({message: 'error en el intento de crear un personaje', error: error.message})
  }
};

module.exports = postPokemons;
