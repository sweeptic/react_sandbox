import React from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import { useState } from 'react';
import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredients =>
      [...prevIngredients, { id: Math.random().toString(), ...ingredient }]
    )
  }


  return (
    <div className="App">

      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        < IngredientList ingredients={userIngredients} onRemoveItem={() => { }} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
