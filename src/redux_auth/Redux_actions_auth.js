import * as actionTypes from './Redux_actiontypes'
import axios from 'axios'


// ******************************************Public interface to components
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
            // console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
         })
         .catch(err => {
            dispatch(authFail(err.response.data.error));
         })
   }
}

export const authCheckState = () => {
   return dispatch => {
      const token = localStorage.getItem('token')
      if (!token) {
         dispatch(logout());
      } else {
         const expirationDate = new Date(localStorage.getItem('expirationDate'));
         if (expirationDate < new Date()) {
            dispatch(logout());
         } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
         }
      }
   }
}

export const logout = () => {
   return {
      type: actionTypes.AUTH_SAGA_LOGOUT
   }
}




// ******************************************Non-public interface to components
export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   }
}

export const authSuccess = (token, userId) => {
   // console.log('auth success')
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

export const checkAuthTimeout = (expirationTime) => {
   // expirationTime = 5000 
   // console.log('logged out', expirationTime * 1000, ' millisec later..')
   return dispatch => {
      setTimeout(() => {
         dispatch(logout());
      }, expirationTime * 1000) //3600000  millisec = 60 minute
   }
}