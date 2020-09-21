import React from 'react'
import { useState } from 'react';

//context object
export const AuthContext = React.createContext({
   isAuth: false,
   login: () => { }
});

//context component
const AuthContextProvider = props => {

   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const loginHandler = () => {
      setIsAuthenticated(true);
   }

   return (
      <AuthContext.Provider value={{ login: loginHandler, isAuth: isAuthenticated }}>
         {props.children}
      </AuthContext.Provider>
   )
}

export default AuthContextProvider;