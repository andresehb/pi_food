// Esta ruta nos permite añadir recetas a nuestra página

const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const router = Router();


router.post('/', async (req, res) => {
    let {
        title,
        image,
        summary,
        healthScore,
        analyzedInstructions,
        dietTypes,
        createdInDb
    } = req.body;

    let newRecipe = await Recipe.create({
        title,
        image,
        summary,
        healthScore,
        analyzedInstructions,
        createdInDb
    });

    let dietsDb = await Diets.findAll({
        where: { name: dietTypes }
    });

    newRecipe.addDiets(dietsDb);
    res.status(200).send('Recipe added');
});

module.exports = router;