import React from 'react'

const Product = (props) => {
   return (
      // <div className="card p-4 mt-3">
      //    <div className="card-body">
      //       <img className="card-img-top img-fluid" src="https://source.unsplash.com/random/301x200" alt="" />
      //       <h4 className="card-title">{props.productName}</h4>
      //       <h6 className="card-subtitle text-muted">Card subtitle</h6>
      //       <a className="btn btn-outline-primary" href="#">Read More</a>
      //    </div>
      // </div>



      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 p-3">
         <div className="h-100">
            <div style={{ minHeight: "45vh", maxHeight: "45vh", overflowY: "auto" }} className="card border border-dark bg-white m-3 p-3">
               <img className="card-img-top img-fluid" src="https://source.unsplash.com/random/301x200" alt={props.index} />
               <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{props.productName}</h5>
                  <a className="mt-auto btn btn-outline-primary" href="#">Read More</a>
               </div>
               <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
               </div>
            </div>
         </div>
      </div>


   )
}

export default Product
