import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../Reducers/ActivityReducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, /* preloadedState, */
  composeEnhancers(
    applyMiddleware(/* any middleware you need */)
  )
);

export default store;
