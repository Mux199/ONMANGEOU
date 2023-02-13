import axios from "axios";

export const GET_USER_RESA = "GET_USER_RESA";
//export const CANCEL_RESA = "CANCEL_RESA";
export const ADD_RESA = "ADD_RESA";
export const GET_RESTAURANT_RESA = "GET_RESTAURANT_RESA";
export const getUserResa = (uid) => {
  return (dispatch) => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}api/reservation/getUserReservation/${uid}`
      )
      .then((res) => {
        dispatch({ type: GET_USER_RESA, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getRestaurantResa = (uid) => {
  return (dispatch) => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}api/reservation/getRestaurantReservation/${uid}`
      )
      .then((res) => {
        dispatch({ type: GET_RESTAURANT_RESA, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addUserResa = (uid) => {
  return (dispatch) => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}api/reservation/getUserReservation/${uid}`
      )
      .then((res) => {
        dispatch({ type: GET_USER_RESA, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

/*
export const cancelReservation = (id, date, hours) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/reservation/cancelReservation/`,
      data: { id, date, hours },
    })
      .then((res) => {
        dispatch({ type: CANCEL_RESA, payload: { id, date, hours } });
      })
      .catch((err) => console.log(err));
  };
};*/
