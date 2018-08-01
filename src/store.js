// src/store.js
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import ReduxThunk from 'redux-thunk';

const enhancer = compose(applyMiddleware(ReduxThunk));
const store = createStore(reducer, enhancer);
export default store;
