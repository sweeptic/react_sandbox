import React from 'react'
import NavigationBar from './NavigationBar'

const PageLayout = (props) => {
   return (
      <div>
         <NavigationBar avatarSize={props.avatarSize}/>
      </div>
   )
}

export default PageLayout
