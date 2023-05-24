import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addRecipeFunc, getRecipesByDietFunc } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./CreateRecipe.css";
function validateForm (input) {
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if(!input.title) errors.title = 'Missing title'
    if(!input.summary) errors.summary= 'Missing summary'
    if(input.spoonacularScore < 0 || input.spoonacularScore > 100 || !reg.test(input.spoonacularScore)) errors.spoonacularScore = 'Missing rating'
    if(input.healthScore<0 || input.healthScore>100 || !reg.test(input.healthScore)) errors.healthScore = 'Missing health score'
    return errors
}


const CreateRecipe = () => {
    const dispatch = useDispatch()
    let dietList = useSelector((state) => state.dietTypesArr)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        title: '',
        summary: '',
        spoonacularScore: '',
        healthScore: '',
        analyzedInstructions: '',
        dietTypes: []
    })

    useEffect(() => {
        dispatch(getRecipesByDietFunc())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateForm({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    function handleSelect(e) {
        setInput({
            ...input,
            dietTypes: [...input.dietTypes, e.target.value]
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addRecipeFunc(input))
        alert('New Recipe Added')
        setInput({
            title: '',
            summary: '',
            spoonacularScore: '',
            healthScore: '',
            analyzedInstructions: '',
            dietTypes: []
        })
    }
    function handleDelete(e){
        setInput({
            ...input,
            dietTypes: input.dietTypes.filter(diet => diet !== e )
        })
    }

    return (
        <div className="create_recipe_wrapper">
            <div className="recipe_creator">
                <Link to='/home'><button className="btn_create_recipe">Back</button></Link>
                <h1>create a new recipe</h1>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                <div className="form_info">
                    <label className="info_label">Name</label>
                    <input
                        type='text'
                        name='title'
                        value={input.title}
                        onChange={(e) => {handleChange(e)}}
                    />
                    {errors.title && (
                        <p className="form_err_msg">{errors.title}</p>
                    )}
                </div>
                <div className="form_info">
                    <label className="info_label">Summary</label>
                    <input
                        type='text'
                        name='summary'
                        value={input.summary}
                        onChange={(e) => {handleChange(e)}} 
                    />
                    {errors.summary && (
                        <p className="form_err_msg">{errors.summary}</p>
                    )}
                </div>
                <div className="form_info">
                    <label className="info_label">Rating</label>
                    <input
                        type='text'
                        name='spoonacularScore'
                        value={input.spoonacularScore}
                        onChange={(e) => {handleChange(e)}} 
                    />
                    {errors.spoonacularScore && (
                        <p className="form_err_msg">{errors.spoonacularScore}</p>
                    )}
                </div>
                <div className="form_info">
                    <label className="info_label">Health Score</label>
                    <input
                        type='text'
                        name='healthScore'
                        value={input.healthScore}
                        onChange={(e) => {handleChange(e)}} 
                    />
                    {errors.healthScore && (
                        <p className="form_err_msg">{errors.healthScore}</p>
                    )}
                </div>
                <div className="form_info">
                    <label className="info_label">Step-by-step</label>
                    <input
                        type='text'
                        name='analyzedInstructions'
                        value={input.analyzedInstructions}
                        onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {dietList?.map((t) => {
                        return <option value={t}> {t} </option>
                    })}
                </select >
                {errors.hasOwnProperty('title') || errors.hasOwnProperty('summary') || errors.hasOwnProperty('spoonacularScore') || errors.hasOwnProperty('healthScore') ?  <p className="form_warning_msg">Enter all information to continue</p> : <button className="btn_cr_submit" type='submit'>Create New Recipe</button>}
                </form>
            
                {input.dietTypes.map(e => {
                    return (
                    <div >
                        <h5>{e}</h5>
                        <button onClick={() => handleDelete(e)}>X</button>
                    </div>
                )})}
            </div>
            <div className="quote_container">
                <div className="quote_body">
                    <p>"Chefs don't</p>
                    <p>make mistakes;</p>
                    <p>they make</p>
                    <p>new dishes."</p>
                </div>
                <p className="quote_author">
                    - Elizabeth Briggs
                </p>
            </div>
        </div>
    )

}

export default CreateRecipe;