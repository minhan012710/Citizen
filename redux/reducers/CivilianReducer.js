import { actions } from '../constants';
import { reducerDefault, reducerAdvance } from '../reducer';

export const informCivilian = (...props) => {
    return reducerDefault(...props, actions.INFORM_CIVILIAN);
}

export const reinformCivilian = (...props) => {
    return reducerDefault(...props, actions.REINFORM_CIVILIAN);
}

export const deleteCivilian = (...props) => {
    return reducerDefault(...props, actions.DELETE_CIVILIAN);
}

export const searchCivilians = (...props) => {
    return reducerAdvance(...props, actions.SEARCH_CIVILIANS);
}

export const getCivilianById = (...props) => {
    return reducerDefault(...props, actions.GET_CIVILIAN_BY_ID);
}

export const civilianReducer = {
    informCivilian,
    reinformCivilian,
    searchCivilians,
    getCivilianById,
    deleteCivilian
}