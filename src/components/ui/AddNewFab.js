//  AddNewFab - Agregar un Floor action bottom boton flotante

import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    // Se lanza el dispatch cuando se da click en el icono de agregar
    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
