import { _onSuccess, _onFail } from '../constants';
import API from '../../utils/api';
import { put, takeLatest } from 'redux-saga/effects';
import { actions } from '../constants';

function* informCivilian(payload) {
    try {
        let res = yield API.post("civilian/informCivilian", payload.body);
        yield put({ type: _onSuccess(actions.INFORM_CIVILIAN), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.INFORM_CIVILIAN) });
    }
}

function* reinformCivilian(payload){
    try {
        let res = yield API.post("civilian/reinformCivilian", payload.body);
        yield put({ type: _onSuccess(actions.REINFORM_CIVILIAN), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.REINFORM_CIVILIAN) });
    }
}

function* deleteCivilian(payload) {
    try {
        let res = yield API.post("civilian/deleteCivilian", payload.body);
        yield put({ type: _onSuccess(actions.DELETE_CIVILIAN), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.DELETE_CIVILIAN) });
    }
}


function* searchCivilians(payload){
    try {
        let res = yield API.post("civilian/searchCivilians", payload.body);
        yield put({ 
            type: _onSuccess(actions.SEARCH_CIVILIANS), 
            data: res.data,
            totalPage: res.totalPage
        });
    } catch (e) {
        yield put({ type: _onFail(actions.SEARCH_CIVILIANS) });
    }
}

function* getCivilianById(payload) {
    try {
        let res = yield API.post("civilian/getCivilianById", payload.body);
        yield put({ type: _onSuccess(actions.GET_CIVILIAN_BY_ID), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.GET_CIVILIAN_BY_ID) });
    }
}

export function* watchCivilianSagas(){
    yield takeLatest(actions.INFORM_CIVILIAN, informCivilian);
    yield takeLatest(actions.REINFORM_CIVILIAN, reinformCivilian);
    yield takeLatest(actions.SEARCH_CIVILIANS, searchCivilians);
    yield takeLatest(actions.GET_CIVILIAN_BY_ID, getCivilianById);
    yield takeLatest(actions.DELETE_CIVILIAN, deleteCivilian);
}