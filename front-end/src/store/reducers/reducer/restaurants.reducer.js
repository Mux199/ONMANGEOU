import {
  GET_RESTAURANTS,
  getRestaurants,
} from "../actions/restaurants.actions";

const initialState = { test: "It works" };

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_RESTAURANTS":
      return action.payload;
    default:
      return state;
  }
};