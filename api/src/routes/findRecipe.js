
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
            res.status(404).send('We could not find that ID. Please try again');
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

module.exports = router;