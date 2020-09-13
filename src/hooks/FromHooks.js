import React from 'react'
import { useState } from 'react'
import Header from './Header'
import Auth from './Auth'
import Todo from './Todo'

const FromHooks = props => {
   const [page, setPage] = useState('auth')

   const switchPage = (pageName) => {
      setPage(pageName)
   }

   return (
      <React.Fragment>
           <h1>Hello from hooks</h1>
         <Header
            onLoadTodos={switchPage.bind(this, 'todos')}
            onLoadAuth={switchPage.bind(this, 'auth')} />
         <hr />
         {page === 'auth' ? <Auth /> : <Todo />}
      </React.Fragment>
   )
}

export default FromHooks