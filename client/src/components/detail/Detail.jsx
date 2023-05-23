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
    const rafaf = recipeDetail.analyzedInstructions.map((e) => e.steps.map((b) => b.step));
    console.log(rafaf);

    return (
        <div>
                {
                    <div key={id} className="recipe_container">
                        <Link to='/home'><button className="btn_back">Back</button></Link>
                        <h1 className="recipe_title"> {recipeDetail.title} </h1>
                        <img src={recipeDetail.image} className="recipe_img"/>
                        <h3 className="recipe_dietType">Diet Type {recipeDetail.dietTypes.map((e) => e.name)}</h3>
                        <h5 className="recipe_summ">Summary: {recipeDetail.summary}</h5>
                        <h5 className="recipe_healthScore">Health Score {recipeDetail.healthScore}</h5>
                    </div>
                }
        </div>
    )
}

export default Detail;