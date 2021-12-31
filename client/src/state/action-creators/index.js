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

export const changeEmail = (email) => {
  return (dispatch) => {
    dispatch({
      type: "changeEmail",
      payload: email,
    });
  };
};

export const changeClassCode = (code) => {
  return (dispatch) => {
    dispatch({
      type: "changeClassCode",
      payload: code,
    });
  };
};

export const addClassCard = (card) => {
  return (dispatch) => {
    dispatch({
      type: "addClassCard",
      payload: card,
    });
  };
};

export const updateClassCardList = (cards) => {
  return (dispatch) => {
    dispatch({
      type: "updateClassCardList",
      payload: cards,
    });
  };
};

export const deleteClassCard = (cardId) => {
  return (dispatch) => {
    dispatch({
      type: "deleteClassCard",
      payload: cardId,
    });
  };
};

export const changeRole = (role) => {
  return (dispatch) => {
    dispatch({
      type: "changeRole",
      payload: role,
    });
  };
};
