import React from 'react';
import { useEffect, useState, useRef } from 'react';
import useHttp from '../../hooks/http';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import './Search.css';



const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();


  useEffect(() => {


    //ha van következo keystroke,  akkor torli az elozot.
    //ha 500ms beluli keystroke van. ha varunk, akkor az utolso 500ms utan lefut.
    const timer = setTimeout(() => {
      // console.log('set timeout')
      // enteredFilter <- this is closure. the enteredfilter value 500ms ago ..
      if (enteredFilter === inputRef.current.value) {
        // console.log('enteredfilter: ', enteredFilter);
        const query =
          enteredFilter.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          'https://react-hooks-update-7337b.firebaseio.com/ingredients.json' + query,
          'GET'
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);


  //can return something. it will be function. this is a cleanup function
  //will run before next use effect function run next time.
  //if return [] <- run when component gets unmounted.
  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);



  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );


});

export default Search;