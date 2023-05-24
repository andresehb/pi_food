import React from "react";
import { getRecipesByIdFunc } from "../../redux/actions";
import { useParams } from "react-router";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Detail.css";

const Detail = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect (() => {dispatch(getRecipesByIdFunc(id))}, []);
    const recipeDetail = useSelector((state) => state.detail);

    return (
        <div>
                {
                    <div key={id} className="recipe_container">
                        <Link to='/home'><button className="btn_back">Back</button></Link>
                        <h1 className="recipe_title"> {recipeDetail.title} </h1>
                        <img src={recipeDetail.image} className="recipe_img"/>
                        <h3 className="recipe_dietType"> <span>Diet Type</span> {recipeDetail.dietTypes?.map((e) => e.name)}</h3>
                        <h5 className="recipe_summ"> <span>Summary</span> {recipeDetail.summary}</h5>
                        <h5 className="recipe_healthScore"> <span>Health Score</span> {recipeDetail.healthScore}</h5>
                        <h5 className="recipe_instrc"> <span>Step-by-step</span> {recipeDetail.analyzedInstructions?.map((e) => e.steps?.map((e) => e.step))}</h5>
                    </div>
                }
        </div>
    )
}

export default Detail;