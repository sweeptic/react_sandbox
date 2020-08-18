import React, { Component } from 'react'

export default class Cat extends Component {
   render() {
      const mouse = this.props.mouse
      return (
         <img src="./cat.jpg" alt="cat" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      )
   }
}
