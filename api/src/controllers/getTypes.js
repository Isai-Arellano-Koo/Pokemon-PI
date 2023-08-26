const axios = require("axios");
const { Types } = require("../db.js");
const { types } = require("util");

const getTypes = async (req, res) => {
  try {
    const data = await Types.findOne();

    if (!data) {
      const response = await axios("https://pokeapi.co/api/v2/type");
      const result = response.data;
      const typesPromise = result.results.map(async (type) => await Types.create({name: type.name}));

      const types = await Promise.all(typesPromise)
      res.status(200).json(types);
    } else {
        const dataAll = await Types.findAll()
      res.status(200).json(dataAll);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al cargar datos", error: error.message });
  }
};

module.exports = getTypes;
