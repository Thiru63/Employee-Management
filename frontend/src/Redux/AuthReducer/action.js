import axios from "axios";
import {
  
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";




const loginReq = () => {
  return { type: LOGIN_REQUEST }
}

const loginSuc = (payload) => {
  return { type: LOGIN_SUCCESS, payload: payload }
}

const loginFai = (message) => {
  return { type: LOGIN_FAILURE, message: message }
}

const logoutSuc = () => {
  return { type: LOGOUT }
}




export const login = async (dispatch, payload) => {
  try {
    dispatch(loginReq())
    console.log(payload)
    let res = await axios.post('https://reqres.in/api/login', payload)
    console.log(res)
    if (res.status == 200) {
      dispatch(loginSuc(res.data))
    } else {
      dispatch(loginFai(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(loginFai("error occurred"))
  }
};

export const logout = (dispatch) => {
  dispatch(logoutSuc())
};
