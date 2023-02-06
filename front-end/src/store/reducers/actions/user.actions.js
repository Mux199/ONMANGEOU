import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_TELEPHONE = "UPDATE_TELEPHONE";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateTelephone = (userId, telephone) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      data: { telephone },
    })
      .then((res) => {
        dispatch({ type: UPDATE_TELEPHONE, payload: telephone });
      })
      .catch((err) => console.log(err));
  };
};
