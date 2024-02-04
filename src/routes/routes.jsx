import React from "react";
import { Route, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Protected from "../components/Protected";
import Signup from "../Pages/TelasLogin/Signup";
import Login from "../Pages/TelasLogin/Login";
import Descobrir from "../Pages/Descobrir/descobrir";
import MeusProjetos from "../Pages/MeusProjetos/MeusProjetos";
import DetalhesMobile from "../pages/Descobrir/detalhesMobile/detalhesMobile";
import PerfilUsuario from '../Pages/PerfilUsuario/PerfilUsuario'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Protected />}>
      <Route path="/" index element={<Descobrir />} />
      <Route path="meus-projetos" element={<MeusProjetos />} />
      <Route path="descobrir" element={<Descobrir />} />
      <Route path="perfil" element={<PerfilUsuario />} />
      <Route path="descobrir/:id" element={<DetalhesMobile />} />
    </Route>
  </Route>
);

export default routes;
