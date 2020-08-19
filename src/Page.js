import React from 'react'
import PageLayout from './PageLayout'

const Page = (props) => {
   return (
      <div>
         <PageLayout avatarSize={props.avatarSize}/>
      </div>
   )
}

export default Page
