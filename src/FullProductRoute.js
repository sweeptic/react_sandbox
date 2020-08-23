import React, { Component } from 'react'
import Axios from 'axios'

export default class FullProductRoute extends Component {
   state = {
      loadedPost: null
   }

   componentDidMount() {
      if (this.props.match.params.id !== null) {
         if (!this.state.loadedPost ||
            (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
            Axios
               .get("https://react-http-cec91.firebaseio.com/product/" + this.props.match.params.id + ".json")
               .then(response => {
                  this.setState({
                     loadedPost: response.data
                  })
               })
         }
      }
   }

   render() {
      let selectedPost = <div className="card p-4 mt-3">
         <div className="card-body">
            <p className="card-text">Please select post!</p>
         </div>
      </div>;

      if (this.state.loadedPost !== null) {
         selectedPost = (
            <div className="card p-4 mt-3">
               <div className="card-body">
                  <img className="card-img-top img-fluid" src="https://source.unsplash.com/random/301x200" alt="" />
                  <h4 className="card-title">{this.state.loadedPost.productName}</h4>
                  <h6 className="card-subtitle text-muted"></h6>
                  <p className="card-text">{this.state.loadedPost.productInfo}</p>
                  {/* <a className="btn btn-outline-danger" href="#">Delete</a> */}
               </div>
            </div>
         )
      }

      return (
         <React.Fragment>
            {selectedPost}
         </React.Fragment>
      )
   }
}