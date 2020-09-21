import React from 'react'
import { useContext } from 'react'
import Auth from './components/Auth'
import { AuthContext } from './components/context/auth-context'
import Ingredients from './components/Ingredients/Ingredients'


// if authContext change then IngredientsApp will rebuild
const IngredientsApp = props => {

   const authContext = useContext(AuthContext);

   let content = <Auth />
   if (authContext.isAuth) {
      content = <Ingredients></Ingredients>
   }

   return content;
}

export default IngredientsApp