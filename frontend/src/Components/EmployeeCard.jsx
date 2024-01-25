import { deleteEmployee } from "../Redux/EmployeeReducer/action";
import { useDispatch, useSelector } from "react-redux";

export const EmployeeCard = ({i, employee ,setEditModal,setFormdata,page,searchTxt,sortBySalary,filterDepartment}) => {

  setFormdata(employee)
  
  const dispatch = useDispatch()
  const auth = useSelector(store => store.authReducer)
  
  
  return (
    <tr className="employee_card">

      <td>{i+1}</td>
      <td>{employee.first_name}</td>
      <td>{employee.last_name}</td>
      <td>{employee.email}</td>
      <td>${employee.salary}</td>
      <td>{employee.department}</td>
      <td><button onClick={()=>setEditModal(true)}>Edit</button><button onClick={()=>deleteEmployee(dispatch,employee.id,page,searchTxt,sortBySalary,filterDepartment)}>Delete</button></td>
    </tr>
  );
};
