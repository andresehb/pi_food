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
        return res.status(400).send('Give your recipe a name and/or instructions to continue');
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
            res.status(200).send('Congrats! Your recipe was created, you are now a chef!');
        } catch (error) {
            res.status(404).send('Oh no! Something went wrong, try again');
        }
    }
});

module.exports = router;