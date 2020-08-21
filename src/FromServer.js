import React, { Component } from 'react'
import Product from './Product'
import FullProduct from './FullProduct'
import NewProduct from './NewProduct'
import Axios from 'axios'

export default class FromServer extends Component {
   state = {
      products: [],
      selectedProdId: null
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

   productSelectHandler = (id) => {
      this.setState({
         selectedProdId: id
      })
   }

   render() {
      const products = this.state.products.map((item, index) => {
         return (
            <Product
               productName={item.productName}
               key={index}
               clicked={() => this.productSelectHandler(item.id)}
            />
         )
      }).slice(0,3)

      return (
         <div className="container">
            <div className="row">
               {products}
            </div>
            <section>
               <FullProduct id={this.state.selectedProdId}  />
            </section>
            <section>
               <NewProduct />
            </section>
         </div>
      )
   }
}