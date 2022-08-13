import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Registered from "../views/Registered/Registered";
import Tasks from "../views/Tasks/Tasks";

const RoutesComponent = () => {
  const RequireLogIn = ({ children }) => {
    if (!localStorage.getItem("token")) {
      return <Navigate to={"/Login"} replace={true} />;
    }
    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireLogIn>
            <Tasks />
          </RequireLogIn>
        }
      />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Registered/:teamID" element={<Registered />} />
      <Route path="*" element={<>Ups!! Something went wrong!</>} />
    </Routes>
  );
};

export default RoutesComponent;
