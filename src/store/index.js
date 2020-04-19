import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';
import middlewares from '../middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
export default () => {
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const createStoreWithMiddleware = enhancer(createStore);
  return createStoreWithMiddleware(reducers);
}

// import { applyMiddleware, compose, createStore } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
// // import { createHashHistory } from 'history'
// // import { getMiddlewares } from 'middleware/middleware'

// import rootReducer from '../reducers/index'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const history = createHashHistory()

// export default function configureStoreWith() {
//   const enhancer = composeEnhancers(
//     applyMiddleware(...getMiddlewares(), routerMiddleware(history))
//   )

//   const createStoreWithMiddleware = enhancer(createStore)
//   const storeWithMiddleware = createStoreWithMiddleware(rootReducer)

//   return storeWithMiddleware
// }
// export { history }
