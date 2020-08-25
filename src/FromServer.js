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

   deletePostHandler = (id) => {
      console.log('delete ', id);
      Axios.delete("https://react-http-cec91.firebaseio.com/product/" + this.state.selectedProdId + ".json")
         .then(response => {
            console.log(response)
         })
   }

   render() {
      // console.log(this.state.products)

      const prod = this.state.products;
      let products = null;
      products = Object.keys(prod).map(item => prod[item])

      // console.log(products)


      const products_ = products.map((item, index) => {
         return (
            <Product
               productName={item.productName}
               key={index}
               clicked={() => this.productSelectHandler(item.id)}
               deletePostHandler={this.deletePostHandler}
            />
         )
      })

      return (
         <div>
            <div className="row">
               {products_}
            </div>
            <section>
               <FullProduct id={this.state.selectedProdId} />
            </section>
            <section>
               <NewProduct />
            </section>
         </div>
      )
   }
}