import * as actionTypes from './Redux_actiontypes'

//this is the state
const initialState = {
   token: null,
   userId: null,
   error: null,
   loading: false
}

const authStart_ = (state = initialState, action) => {
   return {
      ...state,
      error: null,
      loading: true
   }
}

const authSuccess = (state = initialState, action) => {
   // console.log('auth success')
   return {
      ...state,
      token: action.idToken,
      userId: action.userId,
      error: 'null',
      loading: false
   }
}

const authFail = (state = initialState, action) => {
  
   return {
      ...state,
      token: action.idToken,
      error: action.error,
      loading: false
   }
}

const authLogout = (state, action) => {
   return {
      ...state,
      token: null,
      userId: null
   }
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.AUTH_START: return authStart_(state, action)
      case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
      case actionTypes.AUTH_FAIL: return authFail(state, action)
      case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
      
      default:
         return state;
   }
}

export default reducer;