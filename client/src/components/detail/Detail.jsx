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
    const detailsState = useSelector((state) => state.detail);

  return (
      <div>
            { 
                detailsState.length > 0 ? 
       
                <div> 
                    <Link to='/home'><button>Back</button></Link>
                    <h1> {detailsState[0].title} </h1>
                    <img src={detailsState[0].image ? detailsState[0].image :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
                    <h3>Diet Type {detailsState[0].dietTypes.map(t => t.name)}</h3>
                    <h4>Dish Type {detailsState[0].dishTypes ? detailsState[0].dishTypes.map(d => d.name) :'dish type not found'  }</h4>
                    <h5>Summary: {detailsState[0].summary}</h5>
                    <h5>Health Score {detailsState[0].healthScore}</h5>
                    <h5>Rating {detailsState[0].spoonacularScore}</h5>
                    <h5>Step-by-step { Array.isArray(detailsState[0].analyzedInstructions) ? detailsState[0].analyzedInstructions.map(e => e.steps.map(f => f.step)) : detailsState[0].analyzedInstructions }</h5>
                </div> : 
       
                <div><h2>loading...</h2></div>
            }
        </div>
    )
}

export default Detail;