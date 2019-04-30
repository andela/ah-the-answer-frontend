import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
});

export default rootReducer;
