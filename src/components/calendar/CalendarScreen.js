import React, { useEffect, useState } from 'react';
// Se instalan las dos librerias 
// npm i react-big-calendar *Para el calendario* / https://www.npmjs.com/package/react-big-calendar ** ir a Homepage (https://github.com/jquense/react-big-calendar#readme) y luego *DEMO and Docs*
// npm i moment *Para Horas/Fechas *
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-esp';
import { CalendarEvent } from './CalendarEvent';

// Son los estilos del calendar * Getting Started (http://jquense.github.io/react-big-calendar/examples/index.html)
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'; // Libreria de moment español
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es'); // Cambia el idioma de Mes y dias de la plantilla a español

const localizer = momentLocalizer(moment); // or globalizeLocalizer


export const CalendarScreen = () => {

    const dispatch = useDispatch();

    // Extraemos los datos de calendar (en el redux) y de events para mostralo en pantalla 
    const { events, activeEvent } = useSelector( state => state.calendar );

    // Extraemos el uid del redux para cambiar de color cuando sean usuarios diferentes
    const { uid } = useSelector( state => state.auth );

    // Al recargar la pagina no se pierde el lugar donde estabamos **onViewChange** nos ayuda
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {
        
        dispatch( eventStartLoading() );

    }, [ dispatch ])

    // Para crear el evento al hacer doble click en alguna tarea
    const onDoubleClick = (e) => {
        // console.log(e);
        dispatch( uiOpenModal() ); // Al dar doble click se abre el modal (formulario)
    }

    // Selecciona el evento para editarlo o borrarlo
    const onSelectEvent = (e) => {
        // console.log(e);
        dispatch( eventSetActive( e ) );
    }

    // Nos dice en que pagina estamos (week/day/agenda/month)
    const onViewChange = (e) => {
        // console.log(e);
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    // Para limpiar el evento en redux al dar click fuera del evento y se quita el boton de borrar
    const onSelectSlot = (e) => {
        dispatch( eventClearActive() )
    }
    

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            // si el uid = al usuario que lo creo estara en azul y si no estara de otro color
            backgroundColor: ( uid === event.user._id ) ? '#F45A35' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            {/* lo sacamos de http://jquense.github.io/react-big-calendar/examples/index.html */}
            <Calendar
                localizer={ localizer }
                events={ events }   
                startAccessor="start"
                endAccessor="end"
                messages={ messages } // Para que se vea todo en Español
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }   // Para deseleccionar el evento al dar click fuera del evento
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                ( activeEvent ) && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
