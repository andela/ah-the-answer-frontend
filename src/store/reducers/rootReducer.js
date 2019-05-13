import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
});

export default rootReducer;
