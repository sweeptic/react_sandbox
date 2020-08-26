import React, { Component } from 'react'
import ReduxPersons from './redux/ReduxPersons.jsx'

export default class FromRedux extends Component {
   render() {
      return (
         <div>
            <h3>This component does NOT use local state (in components) but instead uses Redux</h3>
            <ReduxPersons />
         </div>
      )
   }
}
