import { combineReducers } from "redux";
import testReducer from "./testReducer";
import emailReducer from "./emailReducer";
import classCodeReducer from "./classCodeReducer";
import classCardsReducer from "./classCardsReducer";

const reducers = combineReducers({
  value: testReducer,
  email: emailReducer,
  classCode: classCodeReducer,
  classCards: classCardsReducer,
});

export default reducers;
