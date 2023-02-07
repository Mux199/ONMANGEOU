const initialState = { test: "It works" };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESA:
      return action.payload;
    default:
      return state;
  }
};
