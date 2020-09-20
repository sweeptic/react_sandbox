import React from 'react';
import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import style from './Search.module.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props

  const [enteredFilter, setEnteredFilter] = useState('')

  useEffect(() => {
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json' + query)
      .then(response => response.json())
      .then(responseData => {

        const loadedingredients = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            loadedingredients.push(
              {
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
          }
        }
        // onLoadIngredients(loadedingredients)
      })
  }, [enteredFilter, onLoadIngredients])



  return (
    <section className={style.search}>
      <Card>
        <div className={style.searchInput}>
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
