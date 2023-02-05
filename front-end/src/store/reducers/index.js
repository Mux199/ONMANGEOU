import { combineReducers } from "redux";

import userReducer from "./reducer/user.reducer";
import usersReducer from "./reducer/users.reducer";
import restausReducer from "./reducer/restaurants.reducer";
import restauReducer from "./reducer/restaurant.reducer";
import planningsReducer from "./reducer/plannings.reducer";
import planningReducer from "./reducer/planning.reducer";
import resaReducer from "./reducer/reservation.reducer";
import resasReducer from "./reducer/reservations.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  resaReducer,
  resasReducer,
  restauReducer,
  restausReducer,
  planningReducer,
  planningsReducer,
});
