import { types } from "../types/types";

const initialState = {
    checking: true,
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false,
            }
        
        case types.authCheckingFinish:
            return{
                ...state,
                checking: false
            }
        
        // Borra todo menos el checking que lo cambia a false
        case types.authLogout:
            return {
                checking: false
            }
    
        default:
            return state;
    }
}