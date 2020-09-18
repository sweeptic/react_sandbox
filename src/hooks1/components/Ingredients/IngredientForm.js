import React from 'react';

import Card from '../UI/Card';
import style from './IngredientForm.module.css';
import { useState } from 'react';

const IngredientForm = React.memo(props => {


  //usestate return this two elements
  //state: current state snapshot. always return initial or updated state
  //react manages detach this, therefore this state will survive re renders. 

  //second element: functions what use for update the state. dispatch ----
  const [inputState, setInputState] = useState({ title: '', amount: '' })

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
              value={inputState.title}
              onChange={event => {
                const newTitle = event.target.value;
                setInputState((prevInputState) => {
                  return ({
                    amount: prevInputState.amount, //react dont guarantee this  will be latest
                    title: newTitle
                  })
                })
              }
              }
            />
          </div>
          <div className={style.formControl}>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputState.amount}
              onChange={event => {
                const newAmount = event.target.value;
                setInputState((prevInputState) => {
                  return ({
                    amount: event.target.value, //react dont guarantee this  will be latest
                    title: prevInputState.title
                  })
                })
              }
              }

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
