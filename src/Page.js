import React from 'react'
import PageLayout from './PageLayout'
import Avatar from './Avatar'

const Page = (props) => {

   const avatar = (
      <Avatar avatarSize={props.avatarSize} />
   )

   return (
      <div>
         <PageLayout avatar={avatar} />
      </div>
   )
}

export default Page
