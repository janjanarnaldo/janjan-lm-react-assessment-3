import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import users from './users';
import posts from './posts';

export default combineReducers({
  form,
  users,
  posts,
});
