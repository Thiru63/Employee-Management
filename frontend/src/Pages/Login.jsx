import React, { useState, useEffect } from "react";
// import "./login.css";
import { login } from "../Redux/AuthReducer/action";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom/dist";
import { Loading } from "../Components/Loading";

export const Login = () => {

  

  const dispatch = useDispatch()
  const state = useSelector(store => store.authReducer)

  const [formdata, setFormdata] = useState({
    email:"eve.holt@reqres.in",
    password:"cityslicka"
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    login(dispatch, formdata)
  }

  


  if (state.isAuth && state.token) {
    return <Navigate to='/' />
  }

  if (state.loading) {
    return <Loading />
  }

  return (
    <div>
      <div >
        <div className="card">
          <h4 className="title">Login Form</h4>
          
          <form onSubmit={handleSubmitLogin}>
            <div className="field">

              <input

                placeholder="Email"
                className="input-field"
                type="email"
                name="email"
                value='eve.holt@reqres.in'
                required
                onChange={handleChange}
              />
            </div>
            <div className="field">

              <input

                placeholder="Password"
                className="input-field"
                name="password"
                value="cityslicka"
                type="password"
                required
                onChange={handleChange}
              />
            </div>
           
            <button className="btn" type="submit">
              Login
            </button>
           
          </form>
        </div>
      </div>
    </div>
  );
};
