const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const addRecipe = require("./addRecipe");
const diets = require("./diets");
const findRecipe = require("./findRecipe");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", findRecipe);
router.use("/recipes", addRecipe);
router.use("/diets", diets);

module.exports = router;