import React from 'react'
import { useState, useEffect, useReducer, useRef } from 'react'
import Axios from 'axios'
import { todoListReducer } from './reducer'
import List from './List'

const Todo = () => {

   const [todoList, dispatch] = useReducer(todoListReducer, []);
   const [inputIsValid, setInputIsValid] = useState(false);
   const todoInputRef = useRef();
   const URI = 'https://hooks-44d95.firebaseio.com/todos.json'

   useEffect(() => {
      console.log('useEffect run')
      Axios.get(URI).then(result => {
         console.log(result);
         const todoData = result.data;
         const todos = []
         for (const key in todoData) {
            todos.push({ id: key, name: todoData[key].name })
         }
         dispatch({ type: 'SET', payload: todos });
      });
      return () => {
         console.log('cleanup')
      }
   }, [])

   const todoAddHandler = () => {
      const todoName = todoInputRef.current.value;
      Axios.post(URI, { name: todoName })
         .then(res => {
            setTimeout(() => {
               const todoItem = { id: res.data.name, name: todoName };
               dispatch({ type: 'ADD', payload: todoItem })
            }, 30);
         })
         .catch(err => {
            console.log(err)
         })
   }

   const todoRemoveHandler = (todoId) => {
      Axios.delete('https://hooks-44d95.firebaseio.com/todos.json', { id: todoId })
         .then(res => {
            dispatch({ type: 'REMOVE', payload: todoId })
         })
         .catch(err => {
            console.log(err)
         })
   }

   const inputValidationHandler = (event) => {
      if (event.target.value.trim() === '') {
         setInputIsValid(false);
      } else {
         setInputIsValid(true);
      }
   }

   return (
      <React.Fragment>
         <input
            type="text"
            placeholder="Todo"
            ref={todoInputRef}
            onChange={inputValidationHandler}
            style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
         />
         <button onClick={todoAddHandler} type="button">Add</button>
         <List items={todoList} onClick={todoRemoveHandler} />
      </React.Fragment>
   )
}

export default Todo