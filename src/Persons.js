import Person from './Person';
import React from 'react'
import { AuthContext } from './App';

const Persons = (props) => {
   let person = null;

   if (props.data !== null) {
      person = props.data.map((item, index) => {
         return (
            <Person              
               id={item.id}
               title={item.title}
               body={item.body}
               key={item.id}
               onChangeHandler={(event) => props.onChangeHandler(event, item.id)}
               deleteHandler={() => props.deleteHandler(index)} 
               />
         )
      })
   }

   return (
      <div>
         <AuthContext.Consumer>
            {auth => auth ? <p style={{ backgroundColor: 'lightblue' }}>authenticated!</p> : <p>please log in</p>}
         </AuthContext.Consumer>
         {person}
      </div>
   )
}

export default Persons