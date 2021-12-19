export const testAdd = (value) => {
  return (dispatch) => {
    dispatch({
      type: "add",
      payload: value,
    });
  };
};
export const testSubtract = (value) => {
  return (dispatch) => {
    dispatch({
      type: "subtract",
      payload: value,
    });
  };
};
