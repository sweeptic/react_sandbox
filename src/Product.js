import React from 'react'

const Product = (props) => {
   return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 p-3" onClick={props.clicked}>
         <div className="h-100">
            <div style={{ minHeight: "55vh", maxHeight: "55vh", overflowY: "auto" }} className="card border border-dark bg-white m-3 p-3">
               <img className="card-img-top img-fluid" src="https://source.unsplash.com/random/301x200" alt={props.index} />
               <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{props.productName}</h5>
                  {/* <a className="mt-auto btn btn-outline-primary" >Read More</a> */}
                  <button onClick={props.deletePostHandler} type="button" className="my-3 btn btn-danger">Delete</button>
               </div>
               <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Product