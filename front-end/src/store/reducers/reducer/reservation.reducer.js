import { GET_USER_RESA, getUserResa } from "../actions/reservation.action";
//import { CANCEL_RESA, cancelReservation } from "../actions/reservation.action";

const initialState = { test: "It works" };

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_RESA":
      return action.payload;
    //case "CANCEL_RESA":
    //return action.payload;
    default:
      return state;
  }
};
