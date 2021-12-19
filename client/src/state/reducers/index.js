import { combineReducers } from "redux";
import testReducer from "./testReducer";

const reducers = combineReducers({
  value: testReducer,
});

export default reducers;
