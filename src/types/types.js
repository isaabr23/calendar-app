// Se crean las acciones o las opciones a seguir
// ESTO ES LO QUE SE MUESTRA EN EL REDUX AL REALIZAR X TAREA
// Se comunica con:
/*
    src/actions/auth.js ** [auth]
    src/actions/events.js ** [vent]
    src/actions/ui.js ** [ui]
*/

export const types = {
    
    uiOpenModal: '[ui] Abrir modal',
    uiCloseModal: '[ui] Cerrar modal',

    eventSetActive: '[event] Set Active',
    eventLogout: '[event] Logout event',

    eventStartAddNew: '[event] Start add new', // Inicializa todo el proceso de grabacionen BD
    eventAddNew: '[event] Agregar nuevo evento',
    eventClearActiveEvent: '[event] Limpiar active event',
    eventUpdated: '[event] Actualizar Evento',
    eventDeleted: '[event] Eliminar evento',

    eventLoaded: '[event] Evento cargado',

    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Registro',
    authStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',
}