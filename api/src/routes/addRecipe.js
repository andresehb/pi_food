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

    if (!title || !analyzedInstructions) {
        return res.status(400).send('Enter a name and instructions to proceed');
    } else {
        try {
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
            res.status(200).send('Recipe created successfully');
        } catch (error) {
            alert('There was an error. Please try again');
            res.status(404).json({error: error.message});
        }
    }
});

module.exports = router;