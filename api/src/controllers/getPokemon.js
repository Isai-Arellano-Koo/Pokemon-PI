const express = require("express");
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios(`${URL}?limit=50`);
    const allPokemons = response.data;

    const pokemonsPromises = allPokemons.results.map(async (pokemon) => {
      const response = await axios(`${URL}/${pokemon.name}`);
      const poke = response.data;

      const attack = poke.stats.find((obj) => obj.stat.name === "attack");
      const defense = poke.stats.find((obj) => obj.stat.name === "defense");
      const hp = poke.stats.find((obj) => obj.stat.name === "hp");
      const speed = poke.stats.find((obj) => obj.stat.name === "speed");
      const types = poke.types.map(type => type.type.name)

      return {
        id: poke.id,
        name: poke.name,
        image: poke.sprites.front_default,
        health: hp.base_stat,
        attack: attack.base_stat,
        defense: defense.base_stat,
        speed: speed.base_stat,
        height: poke.height,
        weight: poke.weight,
        types: types
      };
    });

    const pokemons = await Promise.all(pokemonsPromises);

    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al obtener al personaje",
      error: error.message,
    });
  }
};

const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios(`${URL}/${id}`);
    const pokemon = response.data;

    const attack = pokemon.stats.find((obj) => obj.stat.name === "attack");
    const defense = pokemon.stats.find((obj) => obj.stat.name === "defense");
    const hp = pokemon.stats.find((obj) => obj.stat.name === "hp");
    const speed = pokemon.stats.find((obj) => obj.stat.name === "speed");
    const types = pokemon.types.map(type => type.type.name)

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

const getPokemonByName = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios(`${URL}/${name}`);
    const pokemon = response.data;

    const attack = pokemon.stats.find((obj) => obj.stat.name === "attack");
    const defense = pokemon.stats.find((obj) => obj.stat.name === "defense");
    const hp = pokemon.stats.find((obj) => obj.stat.name === "hp");
    const speed = pokemon.stats.find((obj) => obj.stat.name === "speed");
    const types = pokemon.types.map(type => type.type.name)

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

module.exports = { getPokemonById, getPokemonByName, getAllPokemons };
