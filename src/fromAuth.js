import React, { Component } from 'react'
import Input from './Input';
import { checkValidity } from './util/checkValidity';
import { connect } from 'react-redux';
import * as actions from './redux_auth/Redux_actions_index'

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
      this.props.onAuth(
         this.state.controls.email.value,
         this.state.controls.password.value,
         this.state.controls.isSignUp)
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => {
         return { isSignup: !prevState.isSignup }
      })
   }


   render() {
      const formElementsArray = [];
      for (let key in this.state.controls) {
         formElementsArray.push({
            id: key,
            config: this.state.controls[key]
         })
      }


      const form = formElementsArray.map(formElement => (
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


      return (
         <div className="style.Auth">
            <form onSubmit={this.submitHandler}>
               {form}
               <button>SUBMIT</button>
            </form>
            <hr />
            <button
               onClick={this.switchAuthModeHandler}
            >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</button>
         </div >
      )
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
   }
}


export default connect(null, mapDispatchToProps)(fromAuth); 