import React, { Component } from 'react'
import ProductCard from './ProductCard'
import FullProductRoute from './FullProductRoute'
// import NewProductRoute from './NewProductRoute'
import Axios from 'axios'
import {  Route } from 'react-router-dom'

export default class FromServerRoute extends Component {
   state = {
      products: []
   }

   componentDidMount() {
      Axios
         .get("https://react-http-cec91.firebaseio.com/product.json")
         .then(response => {
            this.setState({
               products: response.data
            })
         })
   }


   productSelectHandler = (id_) => {
      this.props.history.push('/posts/' + id_);
   }

   deletePostHandler = (id) => {
      console.log('delete ', id);
      // Axios.delete("https://react-http-cec91.firebaseio.com/product/" + this.state.selectedProdId + ".json")
      //    .then(response => {
      //       console.log(response)
      //    })
   }

   render() {
      // console.log('render')
      const prod = this.state.products;
      let products = null;
      products = Object.keys(prod).map(item => prod[item])


      const products_ = products.map((item, index) => {
         return (
            <ProductCard
               productName={item.productName}
               key={item.id}
               clicked={() => this.productSelectHandler(item.id)}
               deletePostHandler={this.deletePostHandler}
            />
         )
      })

       console.log(this.props.history)

      return (
         <div >
             <h2>Data from server and with react-router</h2>
            <div >
               <div className="row">
                  {products_}
               </div>
            </div>
            <div >
               <Route path={this.props.match.url + '/:abc_'} exact component={FullProductRoute} />
            </div>
         </div>
      )
   }
}