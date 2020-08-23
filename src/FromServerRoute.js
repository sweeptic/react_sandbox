import React, { Component } from 'react'
import ProductRoute from './ProductRoute'
import FullProductRoute from './FullProductRoute'
// import NewProductRoute from './NewProductRoute'
import Axios from 'axios'
import { Link, Route } from 'react-router-dom'

export default class FromServerRoute extends Component {
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

            // <Link to={'/' + item.id} key={item.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 p-3">

            <ProductRoute
               productName={item.productName}
               key={item.id}
               clicked={() => this.productSelectHandler(item.id)}
               deletePostHandler={this.deletePostHandler}
            />

            // </Link>

         )
      })

      return (
        <div  >
            <div>
               <div className="row">
                  {products_}
               </div>
            </div>
            <div className="container">
               <Route path={this.props.match.url + '/:id'} exact component={FullProductRoute} />
            </div>
        </div>
      )
   }
}