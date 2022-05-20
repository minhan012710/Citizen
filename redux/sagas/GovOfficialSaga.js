import { _onSuccess, _onFail } from '../constants';
import API from '../../utils/api';
import { put, takeLatest } from 'redux-saga/effects';
import { actions } from '../constants';

function* loginUser(payload){
    try{
        let res = yield API.post("admin/login", payload.body);
        yield put({ type: _onSuccess(actions.LOGIN_USER), data: res });
    }catch(e){
        yield put({ type: _onFail(actions.LOGIN_USER) });
    }
}

function* createUser(payload) {
    try {
        let res = yield API.post("admin/create", payload.body);
        yield put({ type: _onSuccess(actions.CREATE_USER), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.CREATE_USER) });
    }
}

function* updateWorkSession(payload) {
    try {
        let res = yield API.post("admin/updateWorkSession", payload.body);
        yield put({ type: _onSuccess(actions.UPDATE_WORK_SESSION), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.UPDATE_WORK_SESSION) });
    }
}

function* searchSubordinates(payload) {
    try {
        let res = yield API.post("admin/searchSubordinates", payload.body);
        yield put({ 
            type: _onSuccess(actions.SEARCH_SUBORDINATES), 
            data: res.data,
            totalPage: res.totalPage
        });
    } catch (e) {
        yield put({ type: _onFail(actions.SEARCH_SUBORDINATES) });
    }
}

export function* watchGovOfficialSagas(){
    yield takeLatest(actions.LOGIN_USER, loginUser);
    yield takeLatest(actions.CREATE_USER, createUser);
    yield takeLatest(actions.UPDATE_WORK_SESSION, updateWorkSession);
    yield takeLatest(actions.SEARCH_SUBORDINATES, searchSubordinates);
}