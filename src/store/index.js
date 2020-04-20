import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';
import middlewares from '../middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
export default () => {
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const createStoreWithMiddleware = enhancer(createStore);
  return createStoreWithMiddleware(reducers);
}
