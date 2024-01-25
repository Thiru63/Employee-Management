import {
  GET_EMPLOYEES_FAILURE,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_REQUEST,
  POST_EMPLOYEE_REQUEST,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILURE,
  PUT_EMPLOYEE_FAILURE,
  PUT_EMPLOYEE_REQUEST,
  PUT_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS
} from "./actionTypes";

// Initial State
const initialState = {
  employees: [],
  totalPages:1,
  loading: false,
  error: null,
  message: "",
  success: false, // Add a success field to track success state
};

// Reducer
export const employeeReducer = (state = initialState, { type, payload,message, totalPages }) => {

  switch (type) {
    case GET_EMPLOYEES_REQUEST:
      return { ...state, loading: true, error: null,success:false,employees:[],message:"",totalPages:1 }
      break;

    case GET_EMPLOYEES_SUCCESS:
      return { ...state, loading: false, success: true, employees: payload, message:"", error: null,totalPages:totalPages }
      break;
    case GET_EMPLOYEES_FAILURE:
      return { ...state, loading: false, error: message,success:false,employees:[],message:"",totalPages:1 }
      break;
    case POST_EMPLOYEE_REQUEST:
      return { ...state, loading: true,error: "",success:false,employees:[],message:"",totalPages:1 }
      break;
    case POST_EMPLOYEE_SUCCESS:
      return { ...state, loading: false, message: message, success: true,employees:[], error: null,totalPages:1 }
      break;
    case POST_EMPLOYEE_FAILURE:
      return { ...state, loading: false, error: message, success: false ,employees:[],message:"",totalPages:1}
      break;
      case PUT_EMPLOYEE_REQUEST:
        return { ...state, loading: true ,error: "",success:false,employees:[],message:"",totalPages:1}
        break;
      case PUT_EMPLOYEE_SUCCESS:
        return { ...state, loading: false, message: message, success: true,employees:[], error: null,totalPages:1 }
        break;
      case PUT_EMPLOYEE_FAILURE:
        return { ...state, loading: false, error: message, success: false,employees:[],message:"",totalPages:1 }
        break;
        case DELETE_EMPLOYEE_REQUEST:
          return { ...state, loading: true ,error: "",success:false,employees:[],message:"",totalPages:1}
          break;
        case DELETE_EMPLOYEE_SUCCESS:
          return { ...state, loading: false, message: message, success: true,employees:[], error: null,totalPages:1 }
          break;
        case DELETE_EMPLOYEE_FAILURE:
          return { ...state, loading: false, error: message, success: false,employees:[],message:"",totalPages:1 }
          break;   


    default:
      return state
      break;
  }
};
