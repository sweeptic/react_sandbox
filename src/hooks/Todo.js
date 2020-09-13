import React from 'react'
import { useState, useEffect, useReducer, useRef } from 'react'
import Axios from 'axios'
import { todoListReducer } from './reducer'

const Todo = () => {

   // const [todoName, setTodoName] = useState('');
   const [todoList, dispatch] = useReducer(todoListReducer, []);
   const todoInputRef = useRef();


   //component run for the first time and every render cycle
   //2 arguments
   useEffect(() => {
      console.log('useEffect run')
      Axios.get('https://hooks-44d95.firebaseio.com/todos.json').then(result => {
         console.log(result);
         const todoData = result.data;
         const todos = []
         for (const key in todoData) {
            todos.push({ id: key, name: todoData[key].name })
         }
         // setTodoList(todos);
         dispatch({ type: 'SET', payload: todos });
      });
      return () => {
         console.log('cleanup')
      }
   }, []) //when this change ..
   // replicate component did mount -> pass empty array
   // replicate component did mount + did update pass [todoName]


   // useEffect(() => {
   //    if (submittedTodo) {
   //       dispatch({ type: 'ADD', payload: submittedTodo })
   //    }
   // }, [submittedTodo]);

   // const inputChangeHandler = event => {
   //    // console.log(todoList) 
   //    setTodoName(event.target.value)
   // }


   const todoAddHandler = () => {

      const todoName = todoInputRef.current.value;

      Axios.post('https://hooks-44d95.firebaseio.com/todos.json', { name: todoName })
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