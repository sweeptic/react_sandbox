import React from 'react';

import Card from '../UI/Card';
import style from './IngredientForm.module.css';

const IngredientForm = React.memo(props => {
  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className={style.ingredientForm}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={style.formControl}>
            <label htmlFor="title">Name</label>
            <input type="text" id="title" />
          </div>
          <div className={style.formControl}>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" />
          </div>
          <div className={style.ingredientForm__actions}>
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
