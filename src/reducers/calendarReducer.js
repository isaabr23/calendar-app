import { types } from '../types/types';

// Moment es la libreria de las fechas
// {
//     id: 'xxxxx,
//     title: 'Cumpleaños del Jefe',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Isaak'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {
        
        // Al dar 1 click se agrega al activeEvent la informacion del evento en el redux/state/tree/activeEvent
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }  
        
            // Al dar 1 click se agrega un nuevo "events" con su informacion en el redux/state/tree/events
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]    
            }            

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

            // Para Editar el evento
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
            
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ]
            }

        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}