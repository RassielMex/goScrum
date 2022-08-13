import { combineReducers } from "redux";
import { taskReducer } from "./tasksReducer";

const rootReducer = combineReducers({ taskReducer });
export default rootReducer;
