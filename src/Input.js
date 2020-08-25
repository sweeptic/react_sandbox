import React from 'react'
import style from './Input.module.css'

const Input = (props) => {

   let inputelement = null;
   const inputClasses = [style.inputElement];

     if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(style.invalid);
    }

   switch (props.elementType) {

      case ('input'):
         inputelement = (
            <input
               {...props.elementConfig}
               value={props.value}
               onChange={props.changed}
               className={inputClasses.join(' ')}
            />
         )
         break;

      case ('textarea'):
         inputelement = (
            <textarea
               {...props.elementConfig}
               value={props.value}
               onChange={props.changed}
               className={inputClasses.join(' ')}
            />
         )
         break;

      case ('select'):
         inputelement = (
            <select
               value={props.value}
               onChange={props.changed}
               className={inputClasses.join(' ')}
            >
               {props.elementConfig.options.map(option => (
                  <option key={option.value} value={option.value}>
                     {option.displayValue}
                  </option>
               ))}
            </select>
         )
         break;

      default:
         inputelement = (
            <input
               {...props.elementConfig}
               value={props.value}
               onChange={props.changed}
               className={inputClasses.join(' ')}
            />
         )
         break;
   }


   return (
      <div className={style.input}>
         <label className={style.label}>{props.label}</label>
         {inputelement}
      </div>
   )
}

export default Input