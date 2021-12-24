const reducer = (state = [], action) => {
  if (action.type === "addClassCard") {
    var newstate = [...state];
    newstate.push(action.payload);
    return newstate;
  } else if (action.type === "updateClassCardList") {
    return action.payload;
  } else if (action.type === "deleteClassCard") {
    let newstate = [];
    for (var i = 0; i < state.length; i++) {
      if (state[i].classId !== action.payload) {
        newstate.push(state[i]);
      }
    }
    return newstate;
  } else {
    return state;
  }
};
export default reducer;
