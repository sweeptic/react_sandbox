import React, { Component } from 'react'
import AuthContext from './Auth-context';

class Login extends Component {
   static contextType = AuthContext;

   componentDidMount() {
      // console.log(this.context)
   }

   render() {
      return (
         <button onClick={this.context.toggleAuth}>
            {this.context.isAuth ? 'Logout' : 'Login'} <br />
            (Toggler)
         </button>
      );
   }
}

export default Login;