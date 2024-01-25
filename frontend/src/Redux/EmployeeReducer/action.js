//   action for get request
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
import axios from "axios";

export const getEmployeeRequest = () => {
  return { type: GET_EMPLOYEES_REQUEST }

};

export const getEmployeeSuccess = (payload,totalPages) => {
  return { type: GET_EMPLOYEES_SUCCESS, payload: payload,totalPages:totalPages }

};

export const getEmployeeFailure = () => {
  return { type: GET_EMPLOYEES_FAILURE }
};

// method to get data from an api
export const getDataEmployees = async (dispatch,page,searchByName,sortBySalary,filterByDepartment) => {
  try {
    dispatch(getEmployeeRequest())
   let url
    if(searchByName&&sortBySalary&&filterByDepartment){
      url=`https://employee-management-app-9t90.onrender.com/employees?_page=${page}&_limit=5&first_name=${searchByName}&department=${filterByDepartment}&_sort=salary&_order=${sortBySalary}`
    }else if(searchByName&&sortBySalary){
      url=`https://employee-management-app-9t90.onrender.com/employees?_page=${page}&_limit=5&first_name=${searchByName}&_sort=salary&_order=${sortBySalary}`

    }else if(sortBySalary&&filterByDepartment){
      url=`https://employee-management-app-9t90.onrender.com/employees?_page=${page}&_limit=5&department=${filterByDepartment}&_sort=salary&_order=${sortBySalary}`

    }else if(filterByDepartment&&searchByName){
      url=`https://employee-management-app-9t90.onrender.com/employees?_page=${page}&_limit=5&first_name=${searchByName}&department=${filterByDepartment}`
    }else if(searchByName){
      url=`https://employee-management-app-9t90.onrender.com/employees?_page=${page}&_limit=5&first_name=${searchByName}`
    }else if(sortBySalary){
      url=`https://employee-management-app-9t90.onrender.com/employees?_page=${page}&_limit=5&_sort=salary&_order=${sortBySalary}`
    }else if(filterByDepartment){
      url=`https://employee-management-app-9t90.onrender.com/employees?_page=${page}&_limit=5&department=${filterByDepartment}`
    }else{
      url=`https://employee-management-app-9t90.onrender.com/employees?_page=${page}&_limit=5`
    }

    
    
    let res = await axios.get(url)
    console.log(res)
    if (res.status == 200) {
      dispatch(getEmployeeSuccess(res.data,(Math.ceil(Number(res.headers["x-total-count"])/5))))
    } else {
      dispatch(getEmployeeFailure(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(getEmployeeFailure())
  }
};

//  POST REQUEST

export const postEmployeeRequest = () => {
  return { type: POST_EMPLOYEE_REQUEST }
}


export const postEmployeeSuccess = (message) => {
  return { type: POST_EMPLOYEE_SUCCESS, message: message }
};

export const postEmployeeFailure = (message) => {
  return { type: POST_EMPLOYEE_FAILURE, message }
};

// method for post EMPLOYEE

export const postEmployee = async (dispatch, newEmployee,page,searchByName,sortBySalary,filterByDepartment) => {
  try {
    dispatch(postEmployeeRequest())
    
    console.log(newEmployee)
    let res = await axios.post(`https://employee-management-app-9t90.onrender.com/employees`, newEmployee)
    console.log(res)
    if (res.status == 201) {
      dispatch(postEmployeeSuccess(res.data.message))
      getDataEmployees(dispatch,page,searchByName,sortBySalary,filterByDepartment)


    } else {
      dispatch(postEmployeeFailure(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(postEmployeeFailure())
  }

}


//  PUT REQUEST

export const putEmployeeRequest = () => {
  return { type: PUT_EMPLOYEE_REQUEST }
}


export const putEmployeeSuccess = (message) => {
  return { type: PUT_EMPLOYEE_SUCCESS, message: message }
};

export const putEmployeeFailure = (message) => {
  return { type: PUT_EMPLOYEE_FAILURE, message }
};

// method for post EMPLOYEE

export const putEmployee = async (dispatch, newEmployee,eid,page,searchByName,sortBySalary,filterByDepartment) => {
  try {
    dispatch(putEmployeeRequest())
    
    let {id,...newEmployeeobj}=newEmployee
    
    console.log(newEmployeeobj)
    let res = await axios.put(`https://employee-management-app-9t90.onrender.com/employees/${'eid'}`, newEmployeeobj)
    console.log(res)
    if (res.status == 200) {
      dispatch(putEmployeeSuccess(res.data.message))
      getDataEmployees(dispatch,page,searchByName,sortBySalary,filterByDepartment)


    } else {
      dispatch(putEmployeeFailure(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(putEmployeeFailure())
  }

}

//  DELETE REQUEST

export const deleteEmployeeRequest = () => {
  return { type: DELETE_EMPLOYEE_REQUEST }
}


export const deleteEmployeeSuccess = (message) => {
  return { type: DELETE_EMPLOYEE_SUCCESS, message: message }
};

export const deleteEmployeeFailure = (message) => {
  return { type: DELETE_EMPLOYEE_FAILURE, message }
};

// method for post EMPLOYEE

export const deleteEmployee = async (dispatch,id,page,searchByName,sortBySalary,filterByDepartment) => {
  try {
    dispatch(deleteEmployeeRequest())
    
    
    let res = await axios.delete(`https://employee-management-app-9t90.onrender.com/employees/${id}`)
    console.log(res)
    if (res.status == 200) {
      dispatch(deleteEmployeeSuccess(res.data.message))
      getDataEmployees(dispatch,page,searchByName,sortBySalary,filterByDepartment)


    } else {
      dispatch(deleteEmployeeFailure(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(deleteEmployeeFailure())
  }

}
