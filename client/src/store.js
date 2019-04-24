import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import postsReducer from './reducers/postsReducer'


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export default createStore(
    postsReducer,
    composeEnhancer(applyMiddleware(thunk))
  );