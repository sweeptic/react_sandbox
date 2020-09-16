import React from 'react';

import Card from '../UI/Card';
import style from './IngredientForm.module.css';
import { useState } from 'react';

const IngredientForm = React.memo(props => {


  //usestate return this two elements
  //state: current state snapshot. always return initial or updated state
  //react manages detach this, therefore this state will survive re renders. 

  //second element: functions what use for update the state. dispatch ----
  const inputState = useState({ title: '', amount: '' })

  const submitHandler = event => {
    event.preventDefault();
  };

  return (
    <section className={style.ingredientForm}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={style.formControl}>
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={inputState[0].title}
              onChange={event => inputState[1]({ title: event.target.value })}
            />
          </div>
          <div className={style.formControl}>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputState[0].amount}
              onChange={event => inputState[1]({ amount: event.target.value })}
            />
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
