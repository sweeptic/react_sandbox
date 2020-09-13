import React from 'react'

const List = (props) => {
   console.log('Rendering the list...')
   return (
      <div>
         <ul>
            {props.items.map(item => {
               // console.log(item)
               return (<li onClick={() => props.onClick(item.id)} key={Math.random()}>{item.name}</li>)
            })}
         </ul>
      </div>
   )
}

export default List
