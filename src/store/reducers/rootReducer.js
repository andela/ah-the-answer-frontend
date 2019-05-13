import { combineReducers } from 'redux';
import RequestPasswordReset from './requestPasswordReset';

const rootReducer = combineReducers({
  resetPassword: RequestPasswordReset,
});

export default rootReducer;
