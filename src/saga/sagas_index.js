import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../redux_auth/Redux_actiontypes'

import {
   logoutSaga,
   checkAuthTimeoutSaga,
   authUserSaga,
   authCheckStateSaga
} from './sagas_auth';

export function* watchAuth() {
   yield all([
      takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
      takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
      takeEvery(actionTypes.AUTH_USER, authUserSaga),
      takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
   ])
}