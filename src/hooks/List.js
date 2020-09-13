import React from 'react'

const List = (props) => {
   console.log('Rendering the list...')
   return (
    
         <ul>
            {props.items.map(item => {
               // console.log(item)
               return (<li onClick={() => props.onClick(item.id)} key={item.id}>{item.name}</li>)
            })}
         </ul>
   
   )
}

export default List
