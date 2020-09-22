import { useCallback, useReducer } from "react"

const initialState = {
   loading: false,
   error: null,
   data: null,
   extra: null,
   identifier: null
};

//three state - send, response, delete
//reducer for UI -  loading spinner or error

//this not re-run every re render cycle
const httpReducer = (curHttpState, action) => {
   switch (action.type) {
      case 'SEND':
         return {
            loading: true,
            error: null,
            data: null,
            extra: null,
            identifier: action.identifier
         };
      case 'RESPONSE':
         return {
            ...curHttpState,
            loading: false,
            data: action.responseData,
            extra: action.extra
         };
      case 'ERROR':
         return { loading: false, error: action.errorMessage };
      case 'CLEAR':
         return initialState;
      default:
         throw new Error('Should not be reached!');
   }
};


//when use this in components, each functional components have own snaphot of that hook.
// share the logic, not the data <- idea of hooks

//just HTTP request not what we do with the response ( delete)
//this  re-run every re render cycle
const useHttp = () => { // This is the hook
   const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

   const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

   const sendRequest = useCallback(
      (url, method, body, reqExtra, reqIdentifer) => {
         dispatchHttp({ type: 'SEND', identifier: reqIdentifer });
         fetch(url, {
            method: method,
            body: body,
            headers: {
               'Content-Type': 'application/json'
            }
         })
            .then(response => {
               return response.json();
            })
            .then(responseData => {
               dispatchHttp({
                  type: 'RESPONSE',
                  responseData: responseData,
                  extra: reqExtra
               });
            })
            .catch(error => {
               dispatchHttp({
                  type: 'ERROR',
                  errorMessage: 'Something went wrong!'
               });
            });
      },
      []
   );

   return {
      isLoading: httpState.loading,
      data: httpState.data,
      error: httpState.error,
      sendRequest: sendRequest,
      reqExtra: httpState.extra,
      reqIdentifer: httpState.identifier,
      clear: clear
   };
};

export default useHttp;