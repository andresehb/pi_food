// En este controlador vamos a tener todas las funciones que obtienen información
// Tanto de la base de datos cómo de la API

const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;

const getApiInfo = async () => {
    const apiUrl = await axios.get(url);
    const apiInfo = await apiUrl.data.results.map((e) => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes.map((e) => {
                return {
                    name: e
                }
            }),
            dietTypes: e.diets.map((e) => {
                return {
                    name: e
                }
            }),
            analyzedInstructions: e.analyzedInstructions
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
};

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo; 
};

const recipeQuery = async (req, res) => {
    const { name } = req.query;
    const recipesTotal = await getAllRecipes();
    
    if (name) {
        let recipeName = await recipesTotal.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
        recipeName.length ?
        res.status(200).json(recipeName) :
        res.status(404).send('Recipe not found');
    } else {
        res.status(200).json(recipesTotal);
    }
};

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    recipeQuery
};