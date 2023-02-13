import { GET_USERS, getUsers } from "../actions/users.actions";

const initialState = { test: "It works" };

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return action.payload;
    default:
      return state;
  }
};
