const reducer = (state = -1, action) => {
  if (action.type === "changeAssignmentId") {
    return action.payload;
  } else {
    return state;
  }
};
export default reducer;
