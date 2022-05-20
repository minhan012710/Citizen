import { actions } from '../constants';
import { reducerDefault, reducerAdvance } from '../reducer';

export const loginUser = (...props) => {
    return reducerDefault(...props, actions.LOGIN_USER);
}

export const createUser = (...props) => {
    return reducerDefault(...props, actions.CREATE_USER);
}

export const updateWorkSession = (...props) => {
    return reducerDefault(...props, actions.UPDATE_WORK_SESSION);
}


export const searchSubordinates = (...props) => {
    return reducerAdvance(...props, actions.SEARCH_SUBORDINATES);
}

export const govOfficialReducers = {
    loginUser,
    createUser,
    updateWorkSession,
    searchSubordinates
}