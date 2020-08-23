import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'


export default class NewProductRoute extends Component {
   state = {
      id: '',              //0, 1 ,2 ...
      productInfo: '',
      productName: '',
      userId: '',          //1-2
      // submitted: false
   }

   postDataHandler = () => {
      const data = {
         id: '',
         productInfo: this.state.productInfo,
         productName: this.state.productName,
         userId: this.state.userId
      }

      Axios.post("https://react-http-cec91.firebaseio.com/product.json", data)
         .then(response => {
            // console.log(response)
            this.props.history.push('/posts')
            // this.setState({ submitted: true });
         })
   }


   render() {
      let redirect = null;
      // if (this.state.submitted) {
      //    redirect = <Redirect to="/posts" />;
      // }
      return (
         <div className="container">
            {redirect}
            <div className="card p-4 mt-3">
               <div className="card-body">
                  <h3 className="text-center">New Post</h3>
                  <hr />
                  <div className="row">
                     <div className="col-md-6">
                        <div className="form-group">
                           <input type="text" className="form-control" placeholder="Product Name" value={this.state.productName} onChange={(event) => this.setState({ productName: event.target.value })} />
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="form-group">
                           <select value={this.state.userId} className="form-control" onChange={(event) => this.setState({ userId: event.target.value })}>
                              <option value="Max">Max</option>
                              <option value="Anna">Anna</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <textarea value={this.state.productInfo} className="form-control" placeholder="Product Info" onChange={(event) => this.setState({ productInfo: event.target.value })}></textarea>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <input onClick={this.postDataHandler} type="submit" value="Submit" className="btn btn-danger btn-block" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

      )
   }
}
