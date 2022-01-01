import { combineReducers } from "redux";
import testReducer from "./testReducer";
import emailReducer from "./emailReducer";
import classCodeReducer from "./classCodeReducer";
import classCardsReducer from "./classCardsReducer";
import roleReducer from "./roleReducer";

const reducers = combineReducers({
  value: testReducer,
  email: emailReducer,
  classCode: classCodeReducer,
  classCards: classCardsReducer,
  role: roleReducer,
});

export default reducers;
