import React, { Component } from 'react'
import Product from './Product'
import FullProduct from './FullProduct'
import NewProduct from './NewProduct'


export default class FromServer extends Component {



   render() {
      return (
         <div className="container">
            <section className="card-columns">
               <Product />
               <Product />
               <Product />
            </section>
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