const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getPokemonById, getPokemonByName, getAllPokemons} = require('../controllers/getPokemon');
const getTypes = require('../controllers/getTypes');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', (req, res) => {
    if(req.query.name) {
        getPokemonByName(req, res);
    } else {
        getAllPokemons(req, res)
    }
})
router.get('/pokemons', getAllPokemons)
router.get('/pokemons/:id', getPokemonById)
router.get('/types', getTypes)


module.exports = router;
