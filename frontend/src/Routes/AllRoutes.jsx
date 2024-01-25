import React from "react";
import { Route, Routes } from "react-router-dom/dist";
import { Dashboard } from "../Pages/Dashboard";
import { Login } from "../Pages/Login";
import { PrivateRoute } from "./PrivateRoute";



export const AllRoutes = () => {
  return <div>
    <Routes>
      
      
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>;
};
