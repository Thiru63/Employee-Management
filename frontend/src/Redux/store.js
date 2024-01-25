import { legacy_createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'
import { authReducer } from "./AuthReducer/reducer";
import { employeeReducer } from './EmployeeReducer/reducer'


const rootReducer = combineReducers({ authReducer, employeeReducer })
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


