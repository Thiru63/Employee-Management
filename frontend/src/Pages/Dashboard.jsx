import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getDataEmployees } from "../Redux/EmployeeReducer/action";
import { Loading } from "../Components/Loading";
import { EmployeeCard } from "../Components/EmployeeCard";
import { putEmployee } from "../Redux/EmployeeReducer/action";
import { AddEmployee } from "../Components/AddEmployee";

export const Dashboard = () => {

  const [addEmployee,setAddEmployee]=useState(false)
  const [editModal,setEditModal]=useState(false)
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const [stxt,setStxt]=useState("")
  const [searchTxt,setSearchTxt]=useState("")
  const [sortBySalary,setSortBySalary]=useState("")
  const [filterDepartment,setFilterDepartment]=useState("")
  const dispatch = useDispatch()
  const state = useSelector(store => store.employeeReducer)
  const auth = useSelector(store => store.authReducer)
  console.log(state)
  
  

  const [formdata, setFormdata] = useState({})
  const handleChange = (e) => {
    let { name, value } = e.target

    if (name == 'experience' || name == 'slots' || name == 'fee') {
      value = Number(value)
    }
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEditModal(false)
    putEmployee(dispatch, formdata,formdata.id,page,searchTxt,sortBySalary,filterDepartment)

  }



  

  

  useEffect(() => {
    getDataEmployees(dispatch,page,searchTxt,sortBySalary,filterDepartment)
    setTotalPage(state.totalPages)
  }, [page,searchTxt,sortBySalary,filterDepartment])
  useEffect(() => {
    
    setTotalPage(state.totalPages)
  }, [state])

  // if(!auth.isAuth){
  //   return <Navigate to='/login'/>
  // }

  if (state.loading) {
    return <Loading />
  }

  // if (state.success) {
  //   return <Navigate to='/' />
  // }

 

  return (
    <div style={{ textAlign: "center" }} >
      <h1>Welcome to Employee Dashboard</h1>
      <button onClick={()=>setAddEmployee(true)}>Add Employee</button>

      {addEmployee?(<AddEmployee addEmployee={addEmployee} setAddEmployee={setAddEmployee} page={page} searchTxt={searchTxt} sortBySalary={sortBySalary} filterDepartment={filterDepartment}/>):(<div >

{editModal?(<div>

  <form className="form" onSubmit={handleSubmit}>
<p className="form-title">Edit Employee</p>
<div className="input-container">
  <span>First Name</span>
  <input
    type="text"

    placeholder="Enter employee First Name"
    name="first_name"
    value={formdata.first_name}
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
    value={formdata.last_name}
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
    value={formdata.email}
    required
    onChange={handleChange}
  />
</div>
<div className="input-container">
  <span>Department</span>
  <select name="department" value={formdata.department} required onChange={handleChange}>
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
    value={formdata.salary}
    required
    onChange={handleChange}
  />
</div>

<button type="submit" className="submit">
  Save Employee
</button>
<button type="button" onClick={()=>setEditModal(false)} className="submit">
  Cancel
</button>
</form>

</div>):(<div>
  <div>
    <select value={sortBySalary} onChange={(e)=>setSortBySalary(e.target.value)}>
      <option value="">Sort By Salary</option>
      <option value="asc">Ascending order</option>
      <option value="desc">Descending order</option>
    </select>
    <div>
      <form onSubmit={(e)=>{e.preventDefault(); setSearchTxt(stxt)}}>
        <input type="text" value={stxt} onChange={(e)=>setStxt(e.target.value)} placeholder="Search by Docter name"/>
        <button type="submit">Search</button>
      </form>
    </div>
    <select value={filterDepartment} onChange={(e)=>setFilterDepartment(e.target.value)}>
    <option value="">Filter By Department</option>
    <option value="Tech">Tech</option>
    <option value="Marketing">Marketing</option>
    <option value="Operations">Operations</option>
    </select>
  </div>
  <table>
    <thead>
      <tr>
        <th>NO.</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {state.employees.length>0?state.employees?.map((employee, i) => {
  return <EmployeeCard key={employee._id} i={i} employee={employee} setEditModal={setEditModal} setFormdata={setFormdata} page={page} searchTxt={searchTxt} sortBySalary={sortBySalary} filterDepartment={filterDepartment}/>
  
}):<tr>No Employees</tr>}
    </tbody>
  </table>
  <div>{
  state.employees.length>0 && <div>
  <button disabled={page==1} onClick={()=>setPage(page-1)}>Prev</button>
  <p>{page} Page Of {totalPage} </p>
  <button disabled={page==totalPage} onClick={()=>setPage(page+1)}>Next</button>
  </div>
  }</div>  

</div>)}

</div>)}
      
    </div>
  );
};
