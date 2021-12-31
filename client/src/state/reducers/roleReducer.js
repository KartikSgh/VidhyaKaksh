const reducer = (state = 0, action) => {
  if (action.type === "changeRole") {
    return action.payload;
  } else {
    return state;
  }
};

export default reducer;
