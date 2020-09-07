import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../redux_auth/Redux_actiontypes'
import { logoutSaga } from './sagas_auth';

export function* watchAuth() {
   yield takeEvery(actionTypes.AUTH_SAGA_LOGOUT, logoutSaga);
}