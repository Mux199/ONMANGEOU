import { combineReducers } from "redux";

import userReducer from "./reducer/user.reducer";
import restauReducer from "./reducer/restaurant.reducer";
import planningReducer from "./reducer/planning.reducer";
import resaReducer from "./reducer/reservation.reducer";

export default combineReducers({
  userReducer,
  resaReducer,
  restauReducer,
  planningReducer,
});
