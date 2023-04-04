import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

// Lo obtenemos de https://github.com/zalmoxisus/redux-devtools-extension#usage
// Es una verificacion que si existen las herramientas lo va a configurar y si no lo deja pasar sin problemas 
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk ) // Para los asincronos
    )
);