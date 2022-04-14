import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import useTheReducer from "./reducer";

const rootReducer = combineReducers({ useTheReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));