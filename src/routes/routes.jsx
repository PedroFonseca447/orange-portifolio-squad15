import React from "react";
import { Route, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Protected from "../components/Protected";
import Signup from "../pages/TelasLogin/Signup";
import Login from "../pages/TelasLogin/Login";
import Descobrir from "../pages/Descobrir/descobrir";
import MeusProjetos from "../Pages/MeusProjetos/MeusProjetos";
import DetalhesMobile from "../pages/Descobrir/detalhesMobile/detalhesMobile";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Protected />}>
      <Route path="/" index element={<Descobrir />} />
      <Route path="meus-projetos" element={<MeusProjetos />} />
      <Route path="descobrir" element={<Descobrir />} />
      <Route path="descobrir/:id" element={<DetalhesMobile />} />
    </Route>
  </Route>
);

export default routes;
