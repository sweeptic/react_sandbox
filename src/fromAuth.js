import React, { Component } from 'react'
import Input from './Input';
import { checkValidity } from './util/checkValidity';
import { connect } from 'react-redux';
import * as actions from './redux_auth/Redux_actions_index';
import Spinner from './Spinner'


class fromAuth extends Component {

   state = {
      controls: {
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Mail Address'
            },
            value: '',
            validation: {
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         password: {
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'Password'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         }
      },
      isSignup: true
   }

   inputChangedHandler = (event, controlName) => {
      const updatedControls = {
         ...this.state.controls,
         [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: checkValidity(
               event.target.value,
               this.state.controls[controlName].validation),
            touched: true
         }
      };
      this.setState({ controls: updatedControls });
   }

   submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth_(
         this.state.controls.email.value,
         this.state.controls.password.value,
         this.state.controls.isSignUp)
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => {
         return { isSignup: !prevState.isSignup }
      })
   }

   signOutHandler = () => {
      this.props.onLogout();
   }


   render() {
      const formElementsArray = [];
      for (let key in this.state.controls) {
         formElementsArray.push({
            id: key,
            config: this.state.controls[key]
         })
      }


      let form = formElementsArray.map(formElement => (
         <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
         />
      ))

      if (this.props.loading) {
         form = <Spinner />
      }

      let errorMessage = null;

      if (this.props.error) {
         errorMessage = (
            <p>{this.props.error.message}</p>
         )
      }


      return (
         <div className="style.Auth">
            <h2>async actions - redux-thunk</h2>
            <h3>get token from server and store browser localstorage - settimeout to 1 hr</h3>
            {errorMessage}
            <form onSubmit={this.submitHandler}>
               {form}
               <button>SUBMIT</button>
            </form>
            <hr />
            <button
               onClick={this.switchAuthModeHandler}
            >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</button>
            <hr />
            <button
               onClick={this.signOutHandler} >
               Sign Out
               </button>
         </div >
      )
   }
}

const mapStateToProps = state => {
   return {
      loading: state.auth.loading,
      error: state.auth.error
   }
}

const mapDispatchToProps = dispatch => {
   return {
      //1. onSubmit->submitHandler-> onAuth_ -> redux_actions - auth
      onAuth_: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
      onLogout: () => dispatch(actions.logout())
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(fromAuth); 