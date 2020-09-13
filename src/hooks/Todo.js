import React from 'react'
import { useEffect, useReducer, useRef } from 'react'
import Axios from 'axios'
import { todoListReducer } from './reducer'

const Todo = () => {

   const [todoList, dispatch] = useReducer(todoListReducer, []);
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


   return (
      <React.Fragment>
         <input
            type="text"
            placeholder="Todo"
            ref={todoInputRef}
         />
         <button onClick={todoAddHandler} type="button">Add</button>
         <ul>
            {todoList.map(todo => {
               console.log(todo)
               return (<li onClick={() => todoRemoveHandler(todo.id)} key={Math.random()}>{todo.name}</li>)
            })}
         </ul>
      </React.Fragment>
   )
}

export default Todo