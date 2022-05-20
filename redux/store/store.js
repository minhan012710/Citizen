import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas/index';
import createSagaMiddleware from "redux-saga";

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem("state");
        if (serializedState == null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("state", serializedState);
    } catch (e) {

    }
}

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(...middlewares));

store.subscribe(() => {
    saveState(store.getState());
});


sagaMiddleware.run(rootSaga);

export default store
