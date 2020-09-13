import React, { useContext } from 'react'
import authContext from './auth-context';


const Auth = props => {

   const auth = useContext(authContext);


   return (
      <div>
         Auth Component
         (set state through context API)
         <br/>
         <button onClick={auth.login}>Log in / Log out</button>
      </div>
   )
}

export default Auth