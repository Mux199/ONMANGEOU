import axios from "axios";

export const ADD_RESA = "ADD_RESA";

export const addResa = (restaurant, user, nbClients, date, hour, lastname) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/reservation/addReservation/`)
      .then((res) => {
        dispatch({
          type: ADD_RESA,
          payload: { restaurant, user, nbClients, date, hour, lastname },
        });
        console.log("res");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
};
