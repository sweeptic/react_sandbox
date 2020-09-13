import React from 'react'
import { useState } from 'react'
import Header from './Header'
import Auth from './Auth'
import Todo from './Todo'
import AuthContext from './auth-context'

const FromHooks = props => {
   const [page, setPage] = useState('auth')
   const [authStatus, setauthStatus] = useState(false)

   const switchPage = (pageName) => {
      setPage(pageName)
   }

   const loginFunc = () => {
      setauthStatus(!authStatus);
   }


   return (
      <React.Fragment>
         <AuthContext.Provider value={{ status: authStatus, login: loginFunc }}>
         <h1>Hello from hooks</h1>
         <Header
            onLoadTodos={switchPage.bind(this, 'todos')}
            onLoadAuth={switchPage.bind(this, 'auth')} />
         <hr />
         {page === 'auth' ? <Auth /> : <Todo />}
         </AuthContext.Provider>
      </React.Fragment >
   )
}

export default FromHooks