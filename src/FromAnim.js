import React, { Component } from 'react'
import { Transition } from 'react-transition-group';
import Modal from './Anim/Modal/Modal';
import BackDrop from './Anim/Backdrop/BackDrop';

export default class FromAnim extends Component {

   state = {
      modalIsOpen: false,
      showBlock: false
   };

   showModal = () => {
      this.setState({ modalIsOpen: true });
   };

   closeModal = () => {
      this.setState({ modalIsOpen: false });
   };


   render() {
      return (
         <div>
            <h1>React Animations</h1>
            <button
               className="Button"
               onClick={() =>
                  this.setState(prevState => ({ showBlock: !prevState.showBlock }))}>Toggle
            </button>
            <br />
            <Transition
               in={this.state.showBlock}
               timeout={1000}
               mountOnEnter
               unmountOnExit
            >

               {state => (
                  <div
                     style={{
                        backgroundColor: "Blue",
                        width: 100,
                        height: 100,
                        margin: "auto",
                        transition: "opacity 1s ease-out",
                        opacity: state === "exiting" ? 0 : 1
                     }}
                  />
               )}
            </Transition>

            <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
            {this.state.modalIsOpen ? <BackDrop show /> : null}
            <button onClick={this.showModal}>Open Modal</button>


         </div>
      )
   }
}
