import React from "react";
import { Route, Routes as ReactRouterRoutes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todos from "./pages/Todos";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/todos" element={<Todos />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth">
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </ReactRouterRoutes>
  );
}
