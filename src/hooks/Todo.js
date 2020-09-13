import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import Axios from 'axios'

const Todo = () => {
   const [todoName, setTodoName] = useState('');
   // const [todoList, setTodoList] = useState([]);
   const [submittedTodo, setSubmittedTodo] = useState(null);
   


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


   useEffect(() => {
      if (submittedTodo) { 
         dispatch({type: 'ADD', payload: submittedTodo})
      }
   }, [submittedTodo]);

   const inputChangeHandler = event => {
      // console.log(todoList)
      setTodoName(event.target.value)
   }

   const todoListReducer = (state, action) => {
      switch (action.type) {
         case 'ADD':
            return state.concat(action.payload);

         case 'SET':
            return action.payload;

         case 'REMOVE':
            return state.filter((todo) => todo.id !== action.payload)

         default:
            return state
      }
   }

   const [todoList, dispatch] = useReducer(todoListReducer, []);

   const todoAddHandler = () => {
      Axios.post('https://hooks-44d95.firebaseio.com/todos.json', { name: todoName })
         .then(res => {
            setTimeout(() => {
               const todoItem = { id: res.data.name, name: todoName };
               setSubmittedTodo(todoItem);
            }, 3000);
         })
         .catch(err => {
            console.log(err)
         })
   }

   const todoRemoveHandler = (todoId) => {

   }


   return (
      <div>
         <input onChange={inputChangeHandler} type="text" placeholder="Todo" value={todoName} />
         <button onClick={todoAddHandler} type="button">Add</button>
         <ul>
            {todoList.map(i => {
               console.log(i)
               return (<li onClick={todoRemoveHandler} key={Math.random()}>{i.name}</li>)
            })}
         </ul>
      </div>
   )
}

export default Todo