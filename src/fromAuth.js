import React, { Component } from 'react'
import Input from './Input';
import { checkValidity } from './redux_adv/util/checkValidity';


export default class fromAuth extends Component {

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
      }
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


   render() {
      const formelementArray = [];
      for (const key in this.state.controls) {
         formelementArray.push({
            id: key,
            config: this.state.controls[key],
         })
      }


      const form = formelementArray.map(formElement => (
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
         <div>
            <form>
               {form}
               <button>SUBMIT</button>
            </form>
         </div >
      )
   }
}
