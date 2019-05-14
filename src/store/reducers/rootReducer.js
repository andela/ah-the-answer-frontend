import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import RequestPasswordReset from './requestPasswordReset';
import authReducer from './authReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  resetPassword: RequestPasswordReset,
  auth: authReducer,
  articles: articleReducer,
});

export default rootReducer;
