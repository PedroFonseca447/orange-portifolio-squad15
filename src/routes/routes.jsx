import React from "react";
import { Route, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Protected from "../components/Protected";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Protected />}>
      <Route path="/" index element={<Home />} />
    </Route>
  </Route>
);

export default routes;
