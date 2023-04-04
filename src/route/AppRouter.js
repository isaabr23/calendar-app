import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    // useSelector jalamos informacion del STORE en este caso es auth del estado (state.auth) y obtenemos el checking que esta en true y luego false al loguearse video 365
    // extraemos tambien el uid el cual regresara un null/string por lo cual colocamos ** !!uid ** si existe uid = true / si no existe = null y con ello sabremos si es ruta privada/publica
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {

        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        return ( <h5> Espere... </h5> );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={ CalendarScreen }
                        isAuthenticated={ !!uid }
                    />
                </Switch>
            </div>
        </Router>
    )
}
