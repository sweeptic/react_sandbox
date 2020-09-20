import React, { useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import { useState } from 'react';
import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);

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
    setUserIngredients(filteredIngredients)
  }, [])  //  <-this never change

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => {
        return response.json()
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ])
      })
  }

  const onRemoveItem = (id) => {
    setUserIngredients(prevIngredients => prevIngredients.filter(item => item.id !== id))
  }

  return (
    <div className="App">

      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        < IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
