import React from "react";
import { Route, Routes as ReactRouterRoutes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todos from "./pages/Todos";
import PrivateRoute from "./PrivateRoute";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route element={<PrivateRoute authentication={false} />}>
        <Route path="/" element={<Todos />}></Route>
      </Route>
      <Route path="/auth">
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </ReactRouterRoutes>
  );
}
