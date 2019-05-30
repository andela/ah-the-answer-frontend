import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import RequestPasswordReset from './requestPasswordReset';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import commentReducer from './commentReducer';
import commentHistoryReducer from './commentHistoryReducer';


const rootReducer = combineReducers({
  profile: profileReducer,
  resetPassword: RequestPasswordReset,
  auth: authReducer,
  articles: articleReducer,
  comments: commentReducer,
  commentHistory: commentHistoryReducer,
});

export default rootReducer;
