// Se manda informacion al uiReducer

import { types } from '../types/types';

export const uiOpenModal = () => ({ 
    type: types.uiOpenModal,
});

export const uiCloseModal = () => ({ 
    type: types.uiCloseModal,
});