import { govOfficialReducers } from './GovOfficialReducer';
import { combineReducers } from 'redux';
import { locationReducers } from './LocationReducer';
import { civilianReducer } from './CivilianReducer';

const rootReducer = combineReducers({
    ...govOfficialReducers,
    ...locationReducers,
    ...civilianReducer,
});

export default rootReducer;