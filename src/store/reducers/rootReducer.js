import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import RequestPasswordReset from './requestPasswordReset';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
  resetPassword: RequestPasswordReset,
});

export default rootReducer;
