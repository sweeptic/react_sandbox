import React from 'react'
import  './FromHooks.css';
// import Auth from './components/Auth';
import AuthContextProvider from './components/context/auth-context';
import IngredientsApp from './IngredientsApp';

const FromHooks1 = () => {
   // the app can listen to this context
   return (
      <AuthContextProvider>   
         <IngredientsApp  />
      </AuthContextProvider>
   )
}

export default FromHooks1
