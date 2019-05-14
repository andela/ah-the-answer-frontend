import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import RequestPasswordReset from './requestPasswordReset';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import followingReducer from './followReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  resetPassword: RequestPasswordReset,
  auth: authReducer,
  articles: articleReducer,
  follows: followingReducer,
});

export default rootReducer;
