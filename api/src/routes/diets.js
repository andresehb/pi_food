
const { Router } = require("express");
const router = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Diets } = require("../db");

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;

router.get('/', async (req, res) => {
    const dietsApi = await axios.get(url);
    const diets = dietsApi.data.results.map((e) => e.diets);
    const mapDiets = diets.flatMap((e) => e);
    mapDiets.forEach(async (e) => {
        try {
            await Diets.findOrCreate({
                where: { name: e }
            });
            const allDiets = await Diets.findAll();
            res.status(200).json(allDiets);
        } catch (error) {
            res.status(404).send('We could  not find that. Perhaps it is Harry Potter and the mystery of the diet');
        }
    });
});

module.exports = router;