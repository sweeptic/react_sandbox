import { put, delay } from 'redux-saga/effects';
import * as actions from '../redux_auth/Redux_actions_index'
import axios from 'axios';


export function* logoutSaga(action) {
   yield localStorage.removeItem('token');
   yield localStorage.removeItem('expirationDate');
   yield localStorage.removeItem('userId');
   yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
   yield delay(action.expirationTime * 1000);
   yield put(actions.logout());
}

export function* authUserSaga(action) {
   yield put(actions.authStart());
   const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
   }

   let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB--v00MYbY8ryMblG80HhX4SHmgNf3l34';

   if (!action.isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB--v00MYbY8ryMblG80HhX4SHmgNf3l34';
   }

   try {
      const response = yield axios.post(url, authData)

      const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
      yield localStorage.setItem('token', response.data.idToken);
      yield localStorage.setItem('expirationDate', expirationDate);
      yield localStorage.setItem('userId', response.data.localId);
      yield put(actions.authSuccess(response.data.idToken, response.data.localId));
      yield put(actions.checkAuthTimeout(response.data.expiresIn));
   } catch (error) {
      yield put(actions.authFail(error.response.data.error));
   }
}