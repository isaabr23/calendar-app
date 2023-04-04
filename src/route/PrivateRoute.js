// Video 191

import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router';

// Se recibiran varios elementos en las props 
// **isAuthenticated (para saber si esta autenticado), component: Component (para saber q persona se renderizo), ...rest (todos los demas argumentos como el exact, path, etc...)** 
export const PrivateRoute = ({ 
    isAuthenticated,
    component: Component,
    ...rest
 }) => {

    
    return (
        <Route { ...rest }
            component={ ( props ) => (
                ( isAuthenticated )
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/login" /> )
            ) }
        />    
    )
}

// Ponemos proptypes requeridos para que funcione el PrivateRoute
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}