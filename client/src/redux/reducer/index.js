export const initialState = {
    recipes: [],
    allRecipes: [],
    detail: [],
    dietTypesArr: []
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_RECIPE':
           return {
            ...state,
            recipes: payload,
            allRecipes: payload
           }

        case 'FILTER_BY_DIET':
            const recipesArr = state.allRecipes;
            const dietTypeFltr = payload === 'All' ? recipesArr : recipesArr.filter((e) => e?.dietTypes?.find((e) => e?.name === payload));
            return {
                ...state,
                recipes: dietTypeFltr
            }
        case 'ORDER_BY_TITLE':
            let order = payload === 'asc' ?
            state.recipes.sort(function(a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1
                }
                if (b.title.toLowerCase() > a.title.toLowerCase()) {
                    return -1
                }
                return 0
            }) :
            state.recipes.sort(function(a,b) {
                if(a.title.toLowerCase() > b.title.toLowerCase()) {
                    return -1
                }
                if(b.title.toLowerCase() > a.title.toLowerCase()) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: order
            }
        case 'ORDER_BY_PTS':
            let orderPts = payload === 'lowhigh' ?
            state.recipes.sort(function(a, b) {
                if (a.healthScore > b.healthScore) {
                    return 1
                }
                if (b.healthScore > a.healthScore) {
                    return -1
                }
                return 0
            }) : 
            state.recipes.sort(function(a, b) {
                if (a.healthScore > b.healthScore) {
                    return -1
                }
                if (b.healthScore > a.healthScore) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: orderPts
            }
        case 'GET_BY_TITLE':
            return {
                ...state,
                recipes: payload,      
            }
        case 'GET_BY_ID':
            return {
                ...state,
                detail: payload
            }
        case 'ADD_RECIPE':
            return {
                ...state,
            }
        case 'GET_DIET_TYPES':
            return {
                ...state,
                dietTypesArr: payload
            }
        default:
            return state;
    }
}

export default rootReducer;