import React from 'react'
import { useState } from 'react'

const FromHooks = props => {

   const [todoName, setTodoName] = useState('')
   const [todoList, setTodoList] = useState([])


   const inputChangeHandler = event => {
      setTodoName(event.target.value)
   }

   const todoAddHandler = () => {
      setTodoList(todoList.concat(todoName))
   }


   return (
      <React.Fragment>
         <h1>Hello from hooks</h1>
         <input onChange={inputChangeHandler} type="text" placeholder="Todo" value={todoName} />
         <button onClick={todoAddHandler} type="button">Add</button>
         <ul>{todoList.map(i => <li key={Math.random()}>{i}</li>)}</ul>
      </React.Fragment>
   )
}

export default FromHooks
