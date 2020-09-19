import React from 'react';

import style from './IngredientList.module.css';

const IngredientList = props => {
  
  const onRemoveItem = (id) => props.onRemoveItem(id)


  return (
    <section className={style.ingredientList}>
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={() => onRemoveItem(ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
