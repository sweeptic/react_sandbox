import React, { Component } from 'react'
import style from './AddPersonRedux.module.css'

export default class AddPersonRedux extends Component {
   state = {
      name: '',
      age: ''
   }

   nameChangedHandler = (event) => {
      this.setState({ name: event.target.value });
   }

   ageChangedHandler = (event) => {
      this.setState({ age: event.target.value });
   }

   render() {
      return (
         <div className={style.AddPerson} >

            <input value={this.state.name} onChange={this.nameChangedHandler} type="text" placeholder="Name" />

            <input value={this.state.age} onChange={this.ageChangedHandler} type="number" placeholder="Age" />

            <button onClick={() => this.props.personAdded(this.state.name, this.state.age)} >Add Person</button>

         </div>
      )
   }
}