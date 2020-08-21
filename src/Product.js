import React from 'react'

const Product = () => {
   return (
         <div className="card p-4 mt-3">
            <div className="card-body">
               <img className="card-img-top img-fluid" src="https://source.unsplash.com/random/301x200" alt="" />
               <h4 className="card-title">Card Title</h4>
               <h6 className="card-subtitle text-muted">Card subtitle</h6>
               <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas.</p>
               <a className="btn btn-outline-primary" href="#">Read More</a>
            </div>
         </div>
   )
}

export default Product
