import Person from './Person';
import React from 'react'

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
         {person}
      </div>
   )
}

export default Persons