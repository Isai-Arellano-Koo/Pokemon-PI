const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllPokemons = require('../controllers/getAllPokemons')
const getPokemonById = require('../controllers/getPokemonById')
const getPokemonByName = require('../controllers/getPokemonByName')
const getTypes = require('../controllers/getTypes');
const postPokemons = require('../controllers/postPokemons');


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

router.get('/pokemons/:id', getPokemonById)

router.get('/types', getTypes)

router.post('/pokemons', postPokemons)


module.exports = router;
