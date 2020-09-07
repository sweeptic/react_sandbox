import * as actionTypes from './Redux_actiontypes'


// ******************************************Public interface to components
//hold async code - used by redux-thunk
export const auth = (email, password, isSignup) => {
   return {
      type: actionTypes.AUTH_USER,
      email: email,
      password: password,
      isSignup: isSignup
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

export const logoutSuccess = () => {
   return {
      type: actionTypes.AUTH_LOGOUT
   }
}

export const checkAuthTimeout = (expirationTime) => {
   return {
      type: actionTypes.AUTH_CHECK_TIMEOUT,
      expirationTime: expirationTime
   }
}