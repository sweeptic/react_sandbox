import React from 'react'
import { connect } from 'react-redux'


const LoginInfo = (props) => {


   const loginInfo = props.isAuthenticated ? 'Logged in' : 'Logged out';



   return (
      <div style={{color: '#61dafb'}}>
         {loginInfo}
      </div>
   )
}


const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null
   }
}

export default connect(mapStateToProps)(LoginInfo)
