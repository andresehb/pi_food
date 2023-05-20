
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
        await Diets.findOrCreate({
            where: { name: e }
        });
    });
    const allDiets = await Diets.findAll();
    res.json(allDiets);
});

module.exports = router;