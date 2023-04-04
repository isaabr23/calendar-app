// Nos ayudara a colocar el TOKEN en algunos lugares (que lo necesiten) y en algunos lugares no

// Del archivo .env
const baseUrl = process.env.REACT_APP_API_URL;

// endpoint = al que yo quiero llamar * data = lo que quiero postear * metodo
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`; // localhost:4000/ api/ xxxx

    if ( method === 'GET') {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`; // localhost:4000/ api/ xxxx
    const token = localStorage.getItem('token') || ''; // el " || ''; " es por si hay algun null en caso de que no haya nada gurdado

    if ( method === 'GET') {
        return fetch( 
            url, {
            method,
            headers: {
                    'x-token': token // token que se encuentra en el localStorage
                }
            });
    } else {
        return fetch( 
            url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}

export {
    fetchSinToken,
    fetchConToken
}