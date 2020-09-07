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
   return {
      type: actionTypes.AUTH_CHECK_STATE
   }
}

export const logout = () => {
   return {
      type: actionTypes.AUTH_INITIATE_LOGOUT
   }
}


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