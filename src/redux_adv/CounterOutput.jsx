import React from 'react'
import style from './CounterOutput.module.css'

const CounterOutput = (props) => {
   return (
      <div className={style.CounterOutput}>
         Current Counter: {props.value}
      </div>
   )
}

export default CounterOutput