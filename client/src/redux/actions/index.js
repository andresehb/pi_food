import axios from "axios";
import { GET_RECIPE, FILTER_BY_DIET, ORDER_BY_TITLE, ORDER_BY_PTS, GET_BY_TITLE, GET_BY_ID, ADD_RECIPE, GET_DIET_TYPES } from "./types";

export const getRecipesFunc = () => {
    return async (dispatch) => {
        var json = await axios.get(`http://localhost:3001/recipes`);
        return dispatch({
            type: GET_RECIPE,
            payload: json.data
        })
    }
}

export const fltrByDiets = (payload) => {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export const fltrByTitle = (payload) => {
    return {
        type: ORDER_BY_TITLE,
        payload
    }
}

export const fltrByPts = (payload) => {
    return {
        type: ORDER_BY_PTS,
        payload
    }
}

export const getRecipesByTitleFunc = (title) => {
    return async (dispatch) => {
        var json = await axios.get(`http://localhost:3001/recipes?name=${title}`);
        return dispatch({
            type: GET_BY_TITLE,
            payload: json.data
        })
    }
}

export const getRecipesByIdFunc = (id) => {
    return async (dispatch) => {
        var json = await axios.get(`http://localhost:3001/recipes/${id}`);
        return dispatch({
            type: GET_BY_ID,
            payload: json.data
        })
    }
}

export const getRecipesByDietFunc = () => {
    return async (dispatch) => {
        var json = await axios.get(`http:localhost:3001/diets`);
        return dispatch({
            type: GET_DIET_TYPES,
            payload: json.data
        })
    }
}

export const addRecipeFunc = (payload) => {
    return async (dispatch) => {
        var json = await axios.post(`http://localhost:3001/recipes`, payload);
        return json
    }
}