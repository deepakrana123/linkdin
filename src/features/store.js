import { createStore ,applyMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducer';

const store = createStore( rootReducer , applyMiddleware(thunkMiddleware));

export default store;