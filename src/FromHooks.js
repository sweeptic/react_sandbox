import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react'

const FromHooks = props => {

   const [todoName, setTodoName] = useState('')
   const [todoList, setTodoList] = useState([])



   //component run for the first time and every render cycle
   //2 arguments
   useEffect(() => {
      Axios.get('https://hooks-44d95.firebaseio.com/todos.json').then(result => {
         console.log(result);
         const todoData = result.data;
         const todos = []
         for (const key in todoData) {
            todos.push({ id: key, name: todoData[key].name })
         }
         setTodoList(todos);
      })
   }, []) //when this change ..
   // replicate component did mount -> pass empty array
   // replicate component did mount + did update pass [todoName]

   const inputChangeHandler = event => {
      setTodoName(event.target.value)
   }

   const todoAddHandler = () => {
      setTodoList(todoList.concat(todoName));
      Axios.post('https://hooks-44d95.firebaseio.com/todos.json', { name: todoName })
         .then(res => {
            console.log(res)
         })
         .catch(err => {
            console.log(err)
         })
   }

   return (
      <React.Fragment>
         <h1>Hello from hooks</h1>
         <input onChange={inputChangeHandler} type="text" placeholder="Todo" value={todoName} />
         <button onClick={todoAddHandler} type="button">Add</button>
         <ul>{todoList.map(i => <li key={Math.random()}>{i.name}</li>)}</ul>
      </React.Fragment>
   )
}

export default FromHooks