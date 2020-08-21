import React, { Component } from 'react'

export default class NewProduct extends Component {
   state = {
      title: '',
      content: '',
      author: 'admin'
   }

   render() {
      return (

         <div className="card p-4 mt-3">
               <div className="card-body">
                  <h3 className="text-center">New Post</h3>
                  <hr />
                  <div className="row">
                     <div className="col-md-6">
                        <div className="form-group">
                           <input type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="form-group">
                           <select value={this.state.author} className="form-control" onChange={(event) => this.setState({ author: event.target.value })}>
                              <option value="Max">Max</option>
                              <option value="Anna">Anna</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <textarea value={this.state.body} className="form-control" placeholder="Blog Post" onChange={(event) => this.setState({ body: event.target.value })}></textarea>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <input onClick={this.postDataHandler} type="submit" value="Submit" className="btn btn-danger btn-block" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        
      )
   }
}
