import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";


export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        // Se guarda el token en el localStorage y se guarda el registro de cuando fue creado el token (token-init-date)
        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            // Establece el uid y name, manda la instruccuin al reducer (authReducer.js) hasta abajo creamos el Login()
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            // Manda mensaje de error cuando no exista el email en la bd y el body.msg es el texto de la BD
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        // Se guarda el token en el localStorage y se guarda el registro de cuando fue creado el token (token-init-date)
        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            // Establece el uid y name, manda la instruccuin al reducer (authReducer.js) hasta abajo creamos el Login()
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            // Manda mensaje de error cuando no exista el email en la bd y el body.msg es el texto de la BD
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async( dispatch ) => {

        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        // Se guarda el token en el localStorage y se guarda el registro de cuando fue creado el token (token-init-date)
        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            // Establece el uid y name, manda la instruccuin al reducer (authReducer.js) hasta abajo creamos el Login()
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ 
    type: types.authCheckingFinish 
});

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear(); // Eliminamos el localStorage (token/token-init-date)
        dispatch( eventLogout() );
        dispatch( logout() );
    }
}

const logout = () => ({
    type: types.authLogout
});