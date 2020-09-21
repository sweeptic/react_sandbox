import React from 'react';
import Card from '../UI/Card';
import style from './IngredientForm.module.css';
import { useState } from 'react';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {


  //usestate return this two elements
  //state: current state snapshot. always return initial or updated state
  //react manages detach this, therefore this state will survive re renders. 

  //second element: functions what use for update the state. dispatch ----
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('')

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
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
              value={enteredTitle}
              onChange={event => {
                setEnteredTitle(event.target.value)
              }}
            />
          </div>
          <div className={style.formControl}>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={event => {
                setEnteredAmount(event.target.value)
              }}
            />
          </div>
          <div className={style.ingredientForm__actions}>
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
