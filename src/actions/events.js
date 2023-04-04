
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

// Se llamara para iniciar el proceso de grabacion en BD
// Lo utilizamos en components/calendar/CalendarModal.js
export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            
            // endpoint=event (localhost:4000/api/**events**)
            const resp = await fetchConToken( 'events', event, 'POST' );
            const body = await resp.json();

            if ( body.ok ) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log(event)
                dispatch( eventAddNew( event ) );

            }

        } catch (error) {
            console.log(error)
        }
    }
}

// Agregar un nuevo evento
const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

// "Activar" un evento
export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

// Desactvar un evento
export const eventClearActive = ( ) => ({ type: types.eventClearActiveEvent });

// Inicia la grabacion de la actualizacion del evento
export const eventStartUpdate = ( event ) => {
    return async(dispatch) => {

        try {
            // console.log(event)
            const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT' ); 
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire( 'Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
}

// Se dispara cuando ya se actualiza la nota
const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

// Se dispara la accion de borrar
export const eventStartDelete = () => {
    return async( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE' ); 
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted() );
                Swal.fire('Eliminado', body.msg, 'success');
            } else {
                Swal.fire( 'Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
}

// Borrar un evento
const eventDeleted = () => ({ type: types.eventDeleted });

// Obtiene todos los eventos usando el endpoint que estan en la BD
export const eventStartLoading = () => {
    return async(dispatch) => {
        
        try {
            
            const resp = await fetchConToken( 'events' );
            const body = await resp.json();
            // console.log(body);

            const events = prepareEvents( body.eventos);

            // console.log(events)
            dispatch( eventLoaded( events ) );

        } catch (error) {
            console.log(error);
        }
    }
}

// Lo mandamos a calendarReducer
// dispara la accion al reducer de los eventos (eventStartLoading)
const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({ type: types.eventLogout });