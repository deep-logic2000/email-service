import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import userReducer from './userReducer';
import snackBarReducer from './snackBarReducer';

const reducer = combineReducers({
  emails: emailReducer,
  users: userReducer,
  snackBar: snackBarReducer,
});

export default reducer;