import * as actionTypes from './Redux_actiontypes'
import axios from 'axios'

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   }
}

export const authSuccess = (token, userId) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      token: token,
      userId: userId
   }
}

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   }
}

//hold async code - used by redux-thunk
export const auth = (email, password, isSignUp) => {
   return dispatch => {
      dispatch(authStart());  //start
      const authData = {
         email: email,
         password: password,
         returnSecureToken: true
      }

      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB--v00MYbY8ryMblG80HhX4SHmgNf3l34';

      if (!isSignUp) {
         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB--v00MYbY8ryMblG80HhX4SHmgNf3l34'
      }

      axios.post(url, authData)
         .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
         })
         .catch(err => {
            dispatch(authFail(err.response.data.error));
         })
   }
} 