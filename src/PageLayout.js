import React from 'react'
import NavigationBar from './NavigationBar'

const PageLayout = (props) => {
   return (
      <div>
         <NavigationBar avatar={props.avatar}/>
      </div>
   )
}

export default PageLayout
