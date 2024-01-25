import { useDispatch, useSelector } from "react-redux";
import { postEmployee } from "../Redux/EmployeeReducer/action";
import { useState } from 'react'
import { Navigate } from "react-router-dom";
import { Loading } from "./Loading";



export const AddEmployee = ({addEmployee , setAddEmployee,page,searchTxt,sortBySalary,filterDepartment}) => {

  const dispatch = useDispatch()
  const auth = useSelector(store => store.authReducer)
  const employee = useSelector(store => store.employeeReducer)

  const [formdata, setFormdata] = useState({

    first_name: "",
    last_name: "",
    email: "",
    department: "",
    salary: ""

  })

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name == 'salary' ) {
      value = Number(value)
    }
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAddEmployee(false)
    postEmployee(dispatch, formdata,page,searchTxt,sortBySalary,filterDepartment)

  }



  if (!addEmployee&&employee.success) {
    return <Navigate to='/' />
  }

  if (employee.loading) {
    return <Loading />
  }

  return (
    <div >
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Add New Employee</p>
        <div className="input-container">
          <span>First Name</span>
          <input
            type="text"

            placeholder="Enter employee First Name"
            name="first_name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Last Name</span>
          <input
            type="text"

            placeholder="Enter employee Last Name"
            name="last_name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Email</span>
          <input
            type="email"

            placeholder="Enter employee Email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Department</span>
          <select name="department"required onChange={handleChange}>
            <option value="">Select employee Department</option>
            <option value="Tech">Tech</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            
          </select>

        </div>
       
        
        <div className="input-container">
          <span>Salary</span>
          <input
            type="number"

            placeholder="Enter Employee Salary in $"
            name="salary"
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit">
          Add Employee
        </button>
      </form>
    </div>
  );
};
