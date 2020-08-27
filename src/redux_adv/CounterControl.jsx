import React from 'react'
import style from './CounterControl.module.css'

const CounterControl = (props) => {
   return (
      <div className={style.CounterControl} onClick={props.click}>
        {props.label}
      </div>
   )
}

export default CounterControl