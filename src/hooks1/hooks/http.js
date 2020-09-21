import { useCallback, useReducer } from "react"


//three state - send, response, delete
//reducer for UI -  loading spinner or error

//this not re-run every re render cycle
const httpReducer = (currHttpState, action) => {
   switch (action.type) {
      case 'SEND':
         return { loading: true, error: null, data: null }
      case 'RESPONSE':
         return { ...currHttpState, loading: false, data: action.responseData }
      case 'ERROR':
         return { loading: false, error: action.errorMessage }
      case 'CLEAR':
         return { ...currHttpState, error: null }
      default:
         throw new Error('Should not get there')
   }
}


//when use this in components, each functional components have own snaphot of that hook.
// share the logic, not the data <- idea of hooks

//just HTTP request not what we do with the response ( delete)
//this  re-run every re render cycle
const useHttp = () => {
   const [httpState, dispatchHttp] = useReducer(httpReducer, {
      loading: false,
      errorMessage: null,
      data: null
   });

   //http req depends on outside
   const sendRequest = useCallback((url, method, body) => {
      // fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients/${ingredientId}.json`, {
      dispatchHttp({ type: 'SEND' });
      //flexible http request
      fetch(
         url,
         {
            method: method,
            body: body,
            headers: {
               'Content-Type': 'application/json'
            }
         }
      )
         .then(response => {
            return response.json()
         })


         .then((responseData) => {
            dispatchHttp({ type: 'RESPONSE', responseData: responseData });
            // setUserIngredients(prevIngredients => prevIngredients.filter(item => item.id !== ingredientId))
            // dispatch({ type: 'DELETE', id: ingredientId })
         })
         .catch((error) => {
            // setError(error.message)
            dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong' });
         })
   }, [])


   return {
      isLoading: httpState.loading,
      data: httpState,
      error: httpState.error,
      sendRequest: sendRequest
   }

}

export default useHttp;