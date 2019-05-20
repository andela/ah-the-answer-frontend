import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import RequestPasswordReset from './requestPasswordReset';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import followingReducer from './followReducer';
import commentReducer from './commentReducer';


const rootReducer = combineReducers({
  profile: profileReducer,
  resetPassword: RequestPasswordReset,
  auth: authReducer,
  articles: articleReducer,
  follows: followingReducer,
  comments: commentReducer,
});

export default rootReducer;
