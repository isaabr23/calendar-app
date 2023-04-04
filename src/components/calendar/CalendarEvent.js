// Colocamos el titulo y nombre en la tarea/recordatorio


import React from 'react';

// Recibe toda la informacion del evento
export const CalendarEvent = ({ event }) => {

    const { title, user } = event;
    return (
        <div>
            <strong> { title } </strong>
            <span>- { user.name } </span>
        </div>
    )
}
