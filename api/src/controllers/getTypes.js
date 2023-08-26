const axios = require("axios");
const { Type } = require("../db.js");

const getTypes = async (req, res) => {
  try {
    const data = await Type.findOne();

    if (!data) {
      const response = await axios("https://pokeapi.co/api/v2/type");
      const result = response.data;
      const typesPromise = result.results.map(async (type) => await Type.create({name: type.name}));

      const types = await Promise.all(typesPromise)
      res.status(200).json(types);
    } else {
        const dataAll = await Type.findAll()
      res.status(200).json(dataAll);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al cargar datos", error: error.message });
  }
};

module.exports = getTypes;
