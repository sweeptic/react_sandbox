import React, { Component } from 'react'
import Product from './Product'
import FullProduct from './FullProduct'
import NewProduct from './NewProduct'
import Axios from 'axios'


export default class FromServer extends Component {
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


   render() {
      console.log(this.state.products)
      const products = this.state.products.map((item, index) => {
         return (
            <Product
               productName={item.productName}
               key={index}
            />
         )

      })

      return (
         <div className="container">
            <div className="row">
               {products}
            </div>
            <section>
               <FullProduct />
            </section>
            <section>
               <NewProduct />
            </section>
         </div>
      )
   }
}