import React, { Component } from 'react'
import Counter from './redux_adv/Counter'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import counterReducer from './redux_adv/store/reducers/counter';
import resultReducer from './redux_adv/store/reducers/result';


const rootReducer = combineReducers({
   ctr: counterReducer,
   res: resultReducer
});

const store = createStore(rootReducer);

export default class FromRedux extends Component {
   render() {
      return (
         <div>       
            <Provider store={store}>
               <h3>Redux Advanced</h3>
               <Counter />
            </Provider>
         </div>
      )
   }
}
