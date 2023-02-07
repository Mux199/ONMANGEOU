import axios from "axios";

export const ADD_RESA = "ADD_RESA";

export const addResa = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/reservation/addReservation/`)
      .then((res) => {
        dispatch({ type: ADD_RESA, payload: data });
        console.log("res");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
};
