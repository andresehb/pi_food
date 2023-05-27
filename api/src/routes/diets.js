
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
        } catch (error) {
            console.log(error); // Envía el error por consola
            alert('There was an error. Please try again'); // Muestra un error al usuario
            const allDiets = await Diets.findAll(); // Busca todos los tipos de dietas
            res.status(200).json(allDiets); // Devuelve todas las dietas
        }
    });
});

module.exports = router;