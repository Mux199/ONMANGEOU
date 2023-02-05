import { GET_USER, getUser } from "../actions/user.actions";

const initialState = { test: "It works" };

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
    case "UPDATE_TELEPHONE":
      return {
        ...state,
        telephone: action.payload,
      };
    default:
      return state;
  }
};
