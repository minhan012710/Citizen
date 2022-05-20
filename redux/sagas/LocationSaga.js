import { _onSuccess, _onFail } from '../constants';
import API from '../../utils/api';
import { put, takeLatest } from 'redux-saga/effects';
import { actions } from '../constants';

function* getProvince(payload) {
    try {
        let res = yield API.get("province/getProvince", payload.params);
        yield put({ type: _onSuccess(actions.GET_PROVINCE), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.GET_PROVINCE) });
    }
}

function* getDistrict(payload) {
    try {
        let res = yield API.get("province/getDistrict", payload.params);
        yield put({ type: _onSuccess(actions.GET_DISTRICT), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.GET_DISTRICT) });
    }
}

function* getWard(payload) {
    try {
        let res = yield API.get("province/getWard", payload.params);
        yield put({ type: _onSuccess(actions.GET_WARD), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.GET_WARD) });
    }
}

function* addProvince(payload) {
    try {
        let res = yield API.post("province/addProvince", payload.body);
        yield put({ type: _onSuccess(actions.ADD_PROVINCE), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.ADD_PROVINCE) });
    }
}

function* addDistrict(payload) {
    try {
        let res = yield API.post("province/addDistrict", payload.body);
        yield put({ type: _onSuccess(actions.ADD_DISTRICT), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.ADD_DISTRICT) });
    }
}

function* addWard(payload) {
    try {
        let res = yield API.post("province/addWard", payload.body);
        yield put({ type: _onSuccess(actions.ADD_WARD), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.ADD_WARD) });
    }
}

function* addResidential(payload) {
    try {
        let res = yield API.post("province/addResidential", payload.body);
        yield put({ type: _onSuccess(actions.ADD_RESIDENTIAL), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.ADD_RESIDENTIAL) });
    }
}

function* getResidential(payload) {
    try {
        let res = yield API.get("province/getResidential", payload.params);
        yield put({ type: _onSuccess(actions.GET_RESIDENTIAL), data: res });
    } catch (e) {
        yield put({ type: _onFail(actions.GET_RESIDENTIAL) });
    }
}

export function* watchLocationSagas(){
    yield takeLatest(actions.GET_PROVINCE, getProvince);
    yield takeLatest(actions.GET_DISTRICT, getDistrict);
    yield takeLatest(actions.GET_WARD, getWard);
    yield takeLatest(actions.GET_RESIDENTIAL, getResidential);
    yield takeLatest(actions.ADD_PROVINCE, addProvince);
    yield takeLatest(actions.ADD_DISTRICT, addDistrict);
    yield takeLatest(actions.ADD_WARD, addWard);
    yield takeLatest(actions.ADD_RESIDENTIAL, addResidential);
}