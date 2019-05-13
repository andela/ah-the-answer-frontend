import { combineReducers } from 'redux';
import RequestPasswordReset from './requestPasswordReset';
import authReducer from './authReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
  resetPassword: RequestPasswordReset,
  auth: authReducer,
  articles: articleReducer,
});

export default rootReducer;
