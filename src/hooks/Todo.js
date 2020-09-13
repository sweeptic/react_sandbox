import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react'

const Todo = () => {
   const [todoName, setTodoName] = useState('');
   const [todoList, setTodoList] = useState([]);
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
         setTodoList(todos);
      });
      return () => {
         console.log('cleanup')
      }

   }, []) //when this change ..
   // replicate component did mount -> pass empty array
   // replicate component did mount + did update pass [todoName]


   useEffect(() => {
      if (submittedTodo) { setTodoList(todoList.concat(submittedTodo)) }
   }, [submittedTodo]);

   const inputChangeHandler = event => {
      // console.log(todoList)
      setTodoName(event.target.value)
   }

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

   return (
      <div>
         <input onChange={inputChangeHandler} type="text" placeholder="Todo" value={todoName} />
         <button onClick={todoAddHandler} type="button">Add</button>
         <ul>
            {todoList.map(i => {
               console.log(i)
               return (<li key={Math.random()}>{i.name}</li>)
            })}
         </ul>
      </div>
   )
}

export default Todo