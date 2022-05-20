import { watchGovOfficialSagas } from './GovOfficialSaga';
import { all, fork } from "redux-saga/effects";
import { watchLocationSagas } from './LocationSaga';
import { watchCivilianSagas } from './CivilianSaga';

export default function* rootSaga(){
    yield all([
        fork(watchGovOfficialSagas),
        fork(watchLocationSagas),
        fork(watchCivilianSagas),
    ]);
}