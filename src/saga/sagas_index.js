import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../redux_auth/Redux_actiontypes'
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './sagas_auth';

export function* watchAuth() {
   yield takeEvery(actionTypes.AUTH_SAGA_LOGOUT, logoutSaga);
   yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
   yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}