import React, { useEffect, useCallback, useReducer } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import { useState } from 'react';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';


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

const initialState = [];


const Ingredients = () => {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, initialState)

  // const [userIngredients, setUserIngredients] = useState([]); // loaded / add / delete data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()

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

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => {
        setIsLoading(false);
        return response.json()
      })
      .then(responseData => {
        //   setUserIngredients(prevIngredients => [
        //     ...prevIngredients,
        //     { id: responseData.name, ...ingredient }
        //   ])
        dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
      })
  }

  const onRemoveItem = (ingredientId) => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
      .then((response) => {
        setIsLoading(false);
        // setUserIngredients(prevIngredients => prevIngredients.filter(item => item.id !== ingredientId))
        dispatch({ type: 'DELETE', id: ingredientId })
      })
      .catch((error) => {
        // setError(error.message)
      })
  }

  //react batches this state update
  const clearError = () => {
    setError(null);
    setIsLoading(false);
    //synchronously after each other .and one render cycle update both updates.
  }


  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError} />}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />
      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        < IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
