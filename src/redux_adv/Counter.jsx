import React, { Component } from 'react'
import CounterControl from './CounterControl'
import CounterOutput from './CounterOutput'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions/index';

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
      onIncrementCounter: () => dispatch(actionCreators.increment()),
      onDecrementCounter: () => dispatch(actionCreators.decrement()),
      onAddCounter: () => dispatch(actionCreators.add(10)),
      onSubtractCounter: () => dispatch(actionCreators.subtract(-15)),
      onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
      onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)