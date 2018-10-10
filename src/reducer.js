import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { test } from './redux/test.redux';


export default combineReducers({ 
    user,
    test
 })