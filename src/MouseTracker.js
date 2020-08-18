import React, { Component } from 'react'
import Mouse from './Mouse'
import Cat from './Cat'

export default class MouseTracker extends Component {

   renderTheCat = cord => <Cat mouse={cord} />

   render() {
      console.log('mousetracker render')
      return (
         <>
            <h1>Move mouse around!</h1>

            {/* <Mouse render={(cord) => (
               <Cat mouse={cord} />
            )} /> */}

            <Mouse render={this.renderTheCat} />

            {/* <Mouse>
               {cord => (
                  <Cat mouse={cord} />
               )}
            </Mouse> */}
         </>
      )
   }
}