const reducer = (state = "krishna@gmail.com", action) => {
  if (action.type === "changeEmail") {
    return action.payload;
  } else {
    return state;
  }
};

export default reducer;
