import React from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import { useState } from 'react';
import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {

    // fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json')



    setUserIngredients(prevIngredients =>
      [...prevIngredients, { id: Math.random().toString(), ...ingredient }]
    )
  }

  const onRemoveItem = (id) => {
    setUserIngredients(prevIngredients => prevIngredients.filter(item => item.id !== id))
  }

  return (
    <div className="App">

      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        < IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
