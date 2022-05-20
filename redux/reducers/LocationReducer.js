import { actions } from '../constants';
import { reducerDefault } from '../reducer';

export const getProvince = (...props) => {
    return reducerDefault(...props, actions.GET_PROVINCE);
}

export const getDistrict = (...props) => {
    return reducerDefault(...props, actions.GET_DISTRICT);
}

export const getWard = (...props) => {
    return reducerDefault(...props, actions.GET_WARD);
}

export const getResidential = (...props) => {
    return reducerDefault(...props, actions.GET_RESIDENTIAL);
}

export const addProvince = (...props) => {
    return reducerDefault(...props, actions.ADD_PROVINCE);
}

export const addDistrict = (...props) => {
    return reducerDefault(...props, actions.ADD_DISTRICT);
}

export const addWard = (...props) => {
    return reducerDefault(...props, actions.ADD_WARD);
}

export const addResidential = (...props) => {
    return reducerDefault(...props, actions.ADD_RESIDENTIAL);
}

export const locationReducers = {
    getProvince,
    getDistrict,
    getWard,
    getResidential,
    addProvince,
    addDistrict,
    addWard,
    addResidential,
}