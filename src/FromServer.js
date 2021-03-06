import React, { Component } from 'react'
import FullProduct from './FullProduct'
import NewProduct from './NewProduct'
import Axios from 'axios'
import ProductCard from './ProductCard'

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
            <ProductCard
               productName={item.productName}
               key={index}
               clicked={() => this.productSelectHandler(item.id)}
               deletePostHandler={this.deletePostHandler}
            />
         )
      })

      return (
         <div>
            <h2>Data from server and without react-router</h2>
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