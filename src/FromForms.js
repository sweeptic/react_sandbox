import React, { Component } from 'react'
import Input from './Input';
import style from './ContactData.module.css'



export default class FromForms extends Component {
   state = {
      orderForm: {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Name'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Street Name'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         zipcode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Zip Code'
            },
            validation: {
               required: true,
               minLength: 5,
               maxLength: 5,
               isNumeric: true
            },
            value: '',
            valid: false,
            touched: false
         },
         country: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Country'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Email'
            },
            value: '',
            validation: {
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [
                  { value: 'fastest', displayValue: 'Fastest' },
                  { value: 'cheapest', displayValue: 'Cheapest' }
               ]
            },
            value: '',
            validation: {},
            valid: true
         },
      },
      formIsValid: false
   }


   orderHandler = (event) => {
      event.preventDefault();
   }

   checkValidity(value, rules) {
      let isValid = true;

      if (!rules) {
         return true;
      }

      if (rules.required) {
         isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
         const pattern = /^\d+$/;
         isValid = pattern.test(value) && isValid
      }

      return isValid;
   }

   inputChangeHandler = (event, inputIdentifier) => {

      const updatedOrderForm = { ...this.state.orderForm };
      const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;

      let formIsValid = true;

      for (let inputIdentifier in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }

      this.setState({
         orderForm: updatedOrderForm,
         formIsValid: formIsValid
      })
   }

   render() {

      const formElementsArray = [];

      for (let key in this.state.orderForm) {
         formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
         })
      }

      let form = (
         <form onSubmit={this.orderHandler}>

            {formElementsArray.map(formElement => (
               <Input
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  key={formElement.id}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  changed={(event) => this.inputChangeHandler(event, formElement.id)}
                  touched={formElement.config.touched}
               />)
            )}

            <button disabled={!this.state.formIsValid}>ORDER</button>
         </form>
      )

      return (
         <div className={style.contactData}>
            <h4>Enter your Contact Data</h4>
            {form}
         </div>
      )


   }
}
