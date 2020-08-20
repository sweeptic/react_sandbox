import React, { PureComponent } from 'react'

export default class Mouse extends PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         x: 0,
         y: 0
      }
   }

   handleMouseMove = (event) => {
      this.setState({
         x: event.clientX,
         y: event.clientY
      })
   }

   render() {
      // console.log('render')
      return (
         <div
            style={{ height: '20vh', backgroundColor: 'lightgreen' }}
            onMouseMove={this.handleMouseMove}>
            <p>The current mouse position is ({this.state.x}, {this.state.y}</p>
            {/* <Cat mouse={this.state}/> */}

            {/* this.props.render :   cord => <Cat mouse={cord} /> */}
            {this.props.render(this.state)}
         </div>
      )
   }
}
