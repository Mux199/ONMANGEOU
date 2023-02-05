import axios from "axios";

export const GET_RESTAURANTS = "GET_RESTAURANTS";

export const getRestaurants = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/restaurant/`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: GET_RESTAURANTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
