import React from 'react';
import Card from './UI/Card';
import style from './Auth.module.css';
import { AuthContext } from './context/auth-context';
import { useContext } from 'react';


const Auth = props => {

  const authContext = useContext(AuthContext);

  const loginHandler = () => {
    authContext.login()
  };


  return (
    <div className={style.auth}>
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
