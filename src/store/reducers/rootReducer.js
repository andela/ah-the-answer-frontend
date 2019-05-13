import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import RequestPasswordReset from './requestPasswordReset';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  resetPassword: RequestPasswordReset,
  auth: authReducer,
});

export default rootReducer;
