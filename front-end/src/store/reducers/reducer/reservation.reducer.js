import { GET_USER_RESA, getUserResa } from "../actions/reservation.actions";
//import { CANCEL_RESA, cancelReservation } from "../actions/reservation.actions";
import {
  GET_RESTAURANT_RESA,
  getRestaurantResa,
} from "../actions/reservation.actions";

const initialState = { test: "It works" };

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_RESA":
      return action.payload;
    case "GET_RESTAURANT_RESA":
      return action.payload;
    //case "CANCEL_RESA":
    //return action.payload;
    default:
      return state;
  }
};
