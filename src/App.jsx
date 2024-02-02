// import { useState } from 'react'
import MeusProjetos from './pages/MeusProjetos/MeusProjetos'
import Descobrir from './pages/Descobrir/descobrir'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PerfilUsuario from './Pages/PerfilUsuario/PerfilUsuario'
import DetalhesMobile from './pages/Descobrir/detalhesMobile/detalhesMobile'
import PerfilPublico from './Pages/perfilPublico/perfilPublico'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MeusProjetos/>}/>
        <Route path='/meus-projetos' element={<MeusProjetos/>}/>
        <Route path='/descobrir' element={<Descobrir/>}/>
        <Route path='/perfil' element={<PerfilUsuario/>}/>
        <Route path='/:id' element={<PerfilPublico/>}/>
        <Route path='/descobrir/:id' element={ <DetalhesMobile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
