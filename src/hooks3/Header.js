import React from 'react'
import authContext from './auth-context'
import { useContext } from 'react'


const Header = (props) => {
   const auth = useContext(authContext)
 
   return (
      <header> 
         <br/>
          {auth.status ? <button onClick={props.onLoadTodos}>Todo List</button> : null}
         <button onClick={props.onLoadAuth}>Auth</button>
      </header>
   )
}

export default Header