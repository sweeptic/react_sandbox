

// useCallback - used to save a function
// useMemo - used to save a value
import React, { useEffect, useCallback, useReducer } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
// import { useState } from 'react';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const initialState = [];

// decoupled from components.                   //action.type, action.ingredients
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not get there');
  }
}

//three state - send, response, delete
//reducer for UI -  loading spinner or error
const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...currHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...currHttpState, error: null }
    default:
      throw new Error('Should not get there')

  }
}


const Ingredients = () => {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, initialState);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, errorMessage: null });

  // const [userIngredients, setUserIngredients] = useState([]); // loaded / add / delete data
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  //use effect - manage side effect

  // //after every render cycle  - component did update
  // useEffect(() => {
  //   fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       // console.log(responseData)
  //       const loadedingredients = []
  //       for (const key in responseData) {
  //         if (responseData.hasOwnProperty(key)) {
  //           loadedingredients.push(
  //             {
  //               id: key,
  //               title: responseData[key].title,
  //               amount: responseData[key].amount,
  //             });
  //         }
  //       }
  //       console.log(loadedingredients)
  //       setUserIngredients(loadedingredients);
  //     })
  // }, []) //<- external depedency (did mount) // now there is dont have any depedencyes

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients)
  }, [userIngredients])


  //cache callback function and survive render cycles
  const filteredIngredientHandler = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])  //  <-this never change

  //no external depedencies
  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => {
        dispatchHttp({ type: 'RESPONSE' });
        return response.json()
      })
      .then(responseData => {
        //   setUserIngredients(prevIngredients => [
        //     ...prevIngredients,
        //     { id: responseData.name, ...ingredient }
        //   ])
        dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
      })
  }, [])

  const RemoveIngredientHandler = useCallback((ingredientId) => {
    dispatchHttp({ type: 'SEND' });
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
      .then((response) => {
        dispatchHttp({ type: 'RESPONSE' });
        // setUserIngredients(prevIngredients => prevIngredients.filter(item => item.id !== ingredientId))
        dispatch({ type: 'DELETE', id: ingredientId })
      })
      .catch((error) => {
        // setError(error.message)
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong' });
      })
  }, [])


  //react batches this state update
  const clearError = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
    // setError(null);
    // setIsLoading(false);
    //synchronously after each other .and one render cycle update both updates.
  },[])

  //storing components -React.memo
  //storing any data - useMemo. dont want to recreate every render cycle

  const ingredientList = useMemo(  //<-finction

    // this function not to memoize.
    // this function return a value should be memo!
    () => {
      return (
        //return memoized object ! []-tells react when change, then re create value
        < IngredientList
          ingredients={userIngredients}
          onRemoveItem={RemoveIngredientHandler}
        />
      )
    }, [userIngredients, RemoveIngredientHandler]) // list of depedencies. tells react when this change then create a new object. (ingredientList)


  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError} >{httpState.error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />


      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        {ingredientList}

        {/* not need render when load spinner is showed */}

        {/* Need to add list here! */}
      </section>


    </div>
  );
}

export default Ingredients;
