import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root'); // Es el root del index

const now = moment().minutes(0).seconds(0).add( 1, 'hours'); // minutos/segundos los redonde a cero 
const nowPlus1 = now.clone().add( 1, 'hours'); // clona el "now" y le agrega una hora mas

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const dispatch = useDispatch();

    // Para estar pendiente del STORE y se lo asignamos a *<Modal 'isOpen'*
    const { modalOpen } = useSelector( state => state.ui );  // Observaremos el estado del 'ui' ** y extraemos el 'modalOpen con destructuracion
    const { activeEvent } = useSelector( state => state.calendar );

    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );
    const [titleValid, setTitleValid] = useState(true);

    // Limpia el formulario al crear uno nuevo  y toma los valores de initEvent y en closeModal tambien se llama a initEvent
    const [formValues, setFormValues] = useState( initEvent );

    const { title, notes, start, end } = formValues;

    // Al dar doble click nos muestra el evento completo con informacion
    useEffect(() => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    // Al dar cick fuera del formulario (modal) se ocultara por que modalOpen estara en FALSE
    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActive() ); // limpiar modal cuando se cierra
        setFormValues( initEvent );
    }

    // Cambiamos el estado en components/hooks/state tambien de handleStartDateChange y handleEndDateChange
    const handleStartDateChange = ( e ) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = ( e ) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
    }

    // Para obtener la informacion del formulario
    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd )) {
            Swal.fire('Error', 'La fecha debe ser mayor a la fecha de inicio', 'error');
            return;
        }

        // Si es el texto menor o igual  2 letras marca error
        if ( title.trim().length <= 2 ) {
            Swal.fire('Upss!', 'Por favor escribe el nombre del evento mas especifico', 'warning');
            return setTitleValid( false );
        }

        if ( activeEvent ) {
            // Aqui estamos actualizando/editandolo
            dispatch( eventStartUpdate( formValues ) )
            
        } else {
            // Aqui estamos creando un nuevo evento
            // Se realiza la grabacion en bd
            dispatch( eventStartAddNew( formValues ) );
        }


        setTitleValid( true );
        closeModal();
    }

    return (
        <Modal
          isOpen={ modalOpen } //se muestra o no el "modal"
          onRequestClose={closeModal} 
          style={customStyles}
          closeTimeoutMS={ 200 } // que se cierre en 200ms (efecto)
          className="modal"
          overlayClassName="modal-fondo"
        >

        <h1> { (activeEvent) ? 'Editar evento' : 'Nuevo evento' } </h1>
        <hr />
        <form 
            className="container"
            onSubmit={ handleSubmitForm }
        >

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker
                    onChange={ handleStartDateChange }
                    value={ dateStart }
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker
                    onChange={ handleEndDateChange }
                    value={ dateEnd }
                    minDate={ dateStart } // Dice que dateStart debe ser menor siempre que dateEnd (VALIDACION)
                    className="form-control"
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={ `form-control ${ !titleValid && 'is-invalid' } ${ titleValid && 'is-valid' }` } // Condicional del titulo si es valido o no
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange={ handleInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
        </Modal>
    )
}