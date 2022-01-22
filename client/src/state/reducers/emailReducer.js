const reducer = (state = "", action) => {
  if (action.type === "changeEmail") {
    return action.payload;
  } else {
    return state;
  }
};

export default reducer;
