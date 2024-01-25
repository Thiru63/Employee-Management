import {
  
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

// Initial State
const initialState = {
  token: "",
  isAuth: false,
  loading: false,
  user_data: null,
  error: null,
  success: false,
  message: ""
};

// Reducer
export const authReducer = (state = initialState, { type, payload, message }) => {
  

  switch (type) {
    
    case LOGIN_REQUEST:
      return { ...state, loading: true,token: null, success: false, isAuth: false, user_data: null,error:null }
      break;
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: payload.token, success: true, isAuth: true, error: null, user_data: payload.user }
      break;
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: message, token: null, success: false, isAuth: false, user_data: null }
      break;
    case LOGOUT:
      return { ...state, loading: false, error: null, token: "", success: false, isAuth: false, user_data: null }
      break;

    default:
      return state
      break;
  }

};
