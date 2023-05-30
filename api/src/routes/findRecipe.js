
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { getAllRecipes, recipeQuery } = require("../controllers/recipeGetter");
const { Recipe, Diets } = require("../db");

router.get('/', recipeQuery);

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getRecipeById = await getAllRecipes();
        const recipeId = getRecipeById.find((e) => e.id == id);
        if (recipeId) {
            res.status(200).json(recipeId);
        } else {
            res.status(404).send('We could not find that ID. But do not fret, try again');
        }
    } catch (error) {
        res.status(500).send('Oops! Something went wrong. It is not your fault, I spilled coffee on my laptop')
    }
});

module.exports = router;