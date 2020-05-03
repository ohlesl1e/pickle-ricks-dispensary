import { combineReducers } from 'redux';
import receiptReducer from './receiptReducer';
import userReducer from './userReducer';

export default combineReducers({
  receiptReducer,
  userReducer,
});