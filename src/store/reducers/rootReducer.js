import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articlesReducer from './articlesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
});

export default rootReducer;
