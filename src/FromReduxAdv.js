import React, { Component } from 'react'
import Counter from './redux_adv/Counter'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import counterReducer from './redux_adv/store/reducers/counter';
import resultReducer from './redux_adv/store/reducers/result';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
   ctr: counterReducer,
   res: resultReducer
});

const logger = (store) => {
   return next => {
      return action => {
         console.log('[Middleware] Dispatching', action);
         const result = next(action);
         console.log('[Middleware] next state', store.getState());
         return result;
      }
   }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

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
