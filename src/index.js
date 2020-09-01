import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { logger } from './util/logger';

//*******************REDUCERS */
//basic redux 
import basicReducer from './redux/store/reducer'

//redux advanced
import counterReducer from './redux_adv/store/reducers/counter';
import resultReducer from './redux_adv/store/reducers/result';

//redux auth
import authReducer from './redux_auth/Redux_reducer_auth';


const rootReducer = combineReducers({
  //basic redux for 'Redux' menu
  bsc: basicReducer,

  //redux advanced for 'R. Adv' menu
  ctr: counterReducer,
  res: resultReducer,

  //redux_auth
  auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer);
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();