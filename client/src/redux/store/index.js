import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer/index";

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
); // Esta línea de código habilita el uso de las herramientas de desarrollador (DevTools)

export default store;