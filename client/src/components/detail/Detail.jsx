import React from "react";
import { getRecipesByIdFunc } from "../../redux/actions";
import { useParams } from "react-router";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Detail = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch(); 
    useEffect (() => {dispatch(getRecipesByIdFunc(id))}, []);
    const recipeDetail = useSelector((state) => state.detail);
    console.log(recipeDetail);

  return (
      <div>
            { 
                recipeDetail.length > 0 ? 
       
                <div key={id}>
                    <Link to='/home'><button>Back</button></Link>
                    <h1> {recipeDetail[0].title} </h1>
                    <img src={recipeDetail[0].image ? recipeDetail[0].image :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
                    <h3>Diet Type {recipeDetail[0].dietTypes.map(t => t.name)}</h3>
                    <h4>Dish Type {recipeDetail[0].dishTypes ? recipeDetail[0].dishTypes.map(d => d.name) :'dish type not found'  }</h4>
                    <h5>Summary: {recipeDetail[0].summary}</h5>
                    <h5>Health Score {recipeDetail[0].healthScore}</h5>
                    <h5>Rating {recipeDetail[0].spoonacularScore}</h5>
                    <h5>Step-by-step { Array.isArray(recipeDetail[0].analyzedInstructions) ? recipeDetail[0].analyzedInstructions.map(e => e.steps.map(f => f.step)) : recipeDetail[0].analyzedInstructions }</h5>
                </div> : 
       
                <div><h2>loading...</h2></div>
            }
        </div>
    )
}

export default Detail;