import * as actionTypes from './Redux_actiontypes'
// import { authStart, authSuccess } from './Redux_actions_auth'

//this is the state
const initialState = {
   token: null,
   userId: null,
   error: null,
   loading: false
}

const authStart = (state = initialState, action) => {
   return {
      ...state,
      error: null,
      loading: true
   }
}

const authSuccess = (state = initialState, action) => {
   return {
      ...state,
      token: action.idToken,
      userId: action.userId,
      error: 'null',
      loading: true
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

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.AUTH_START: return authStart(state, action)
      case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
      case actionTypes.AUTH_FAIL: return authFail(state, action)

      default:
         return state;
   }
}

export default reducer;