import React from 'react'

const Person = (props) => {
   return (
      <div style={{ padding: '15px', margin: '15px', backgroundColor: 'darkgrey' }}>
         <p>id: {props.id}</p>
         <p>title: {props.title}</p>
         <input
            onChange={props.onChangeHandler}
            style={{ padding: '15px' }}
            type="text"
            value={props.title} />
         <p>body: {props.body}</p>
         <button
            onClick={props.deleteHandler}
            style={{ backgroundColor: 'orange' }}>delete this</button>
      </div>
   )
}

export default Person