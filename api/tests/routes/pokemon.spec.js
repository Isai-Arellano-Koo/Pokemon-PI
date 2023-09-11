/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  image: "imagen",
  health: 10,
  attack: 100,
  defense: 100,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {

    it("should get 200", async() => await agent.get("/pokemons").expect(200));

    it("La propiedad types debe ser un arreglo de objetos", async () => {
        const response = await agent.get("/pokemons");
        expect(response.status).to.equal(200);

        const pokemons = response.body;
        expect(pokemons).to.be.an("array"); // Verifica que pokemons es un array

        // * Verifica que pokemons tenga la propiedad types y que esta tenga un array de objetos:

        pokemons.forEach((pokemon) => {
          expect(pokemon).to.have.property("types");
          expect(pokemon.types).to.be.an("array");
          pokemon.types.forEach((type) => {
            expect(type).to.be.an("object");
          });
        });
      });
  });
});
