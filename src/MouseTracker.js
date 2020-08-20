import React, { Component } from 'react'
import Mouse from './Mouse'
import Cat from './Cat'

export default class MouseTracker extends Component {

   // inject this function to mouse trough render attribut
   renderTheCat = cord => <Cat mouse={cord} />

   render() {
      // console.log('mousetracker render')
      return (
         <>
            <h2>Move mouse around!</h2>

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