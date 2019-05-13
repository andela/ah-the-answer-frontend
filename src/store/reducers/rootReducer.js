import { combineReducers } from 'redux';
import RequestPasswordReset from './requestPasswordReset';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  resetPassword: RequestPasswordReset,
  auth: authReducer,
});

export default rootReducer;
