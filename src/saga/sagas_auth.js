import * as actionTypes from '../redux_auth/Redux_actiontypes';
import { put } from 'redux-saga/effects';

export function* logoutSaga(action) {

   yield localStorage.removeItem('token');
   yield localStorage.removeItem('expirationDate');
   yield localStorage.removeItem('userId');

   yield put({
      type: actionTypes.AUTH_LOGOUT
   })
}