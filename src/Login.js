import React from 'react'
import { AuthContext } from './App'

const Login = () => (
   <AuthContext.Consumer>
      {authContext => {
         return (
            <button onClick={authContext.toggleAuth}>
               {authContext.isAuth ? 'Logout' : 'Login'}
            </button>
         )
      }}
   </AuthContext.Consumer>
);

export default Login