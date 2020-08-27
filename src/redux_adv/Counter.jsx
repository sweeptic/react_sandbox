import React, { Component } from 'react'
import CounterControl from './CounterControl'
import CounterOutput from './CounterOutput'
import { connect } from 'react-redux'
import * as actionTypes from './store/reducers/actions';

class Counter extends Component {
   render() {
      return (
         <div>
            <CounterOutput value={this.props.ctr} />

            <CounterControl label="Increment" click={this.props.onIncrementCounter} />
            <CounterControl label="Decrement" click={this.props.onDecrementCounter} />
            <CounterControl label="Add 10" click={this.props.onAddCounter} />
            <CounterControl label="Subtract 15" click={this.props.onSubtractCounter} />
            <hr />
            <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
            <ul>
               {this.props.storedResults.map(item => (
                  <li onClick={() => this.props.onDeleteResult(item.id)} key={item.id}>{item.value}</li>
               ))}
            </ul>
         </div>
      )
   }
}

//input
const mapStateToProps = (state) => {
   return {
      ctr: state.ctr.counter,
      storedResults: state.res.results
   }
}


//output
const mapDispatchToProps = (dispatch) => {
   return {
      onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
      onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
      onAddCounter: () => dispatch({ type: actionTypes.ADD, val: 10 }),
      onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, val: 15 }),
      onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result: result }),
      onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, id: id }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)