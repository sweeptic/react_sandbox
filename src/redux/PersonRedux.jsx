import React from 'react'
import style from './Person.module.css'

const PersonRedux = (props) => {
   return (
      <div className={style.Person} onClick={props.clicked}>
         <h1>{props.name}</h1>
         <p>{props.age}</p>
      </div>
   )
}

export default PersonRedux