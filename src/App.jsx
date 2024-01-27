import { useState } from 'react'
import MeusProjetos from './pages/MeusProjetos/MeusProjetos'
import Descobrir from './pages/Descobrir/descobrir'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Descobrir from './Pages/Descobrir/Descobrir'
import DetalhesMobile from './Pages/Descobrir/detalhesMobile/detalhesMobile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MeusProjetos/>}/>
        <Route path='/meus-projetos' element={<MeusProjetos/>}/>
        <Route path='/descobrir' element={<Descobrir />}/>
        <Route path='/descobrir/:id' element={ <DetalhesMobile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
