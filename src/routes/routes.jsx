import React from "react";
import { Route, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Protected from "../components/Protected";
import Signup from "../pages/TelasLogin/Signup";
import Login from "../pages/TelasLogin/Login";
import Descobrir from "../pages/Descobrir/descobrir";
import MeusProjetos from "../Pages/MeusProjetos/MeusProjetos";
import DetalhesMobile from "../pages/Descobrir/detalhesMobile/detalhesMobile";
import PerfilUsuario from '../Pages/PerfilUsuario/PerfilUsuario';
import PerfilPublico from '../Pages/perfilPublico/PerfilPublico';

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Protected />}>
      <Route path="/" index element={<MeusProjetos />} />
      <Route path="meus-projetos" element={<MeusProjetos />} />
      <Route path="descobrir" element={<Descobrir />} />
      <Route path="perfil" element={<PerfilUsuario />} />
      <Route path="/:id" element={<PerfilPublico />} />
      <Route path="descobrir/:id" element={<DetalhesMobile />} />
    </Route>
  </Route>
);

export default routes;
