import { useState } from 'react'
import MeusProjetos from './pages/MeusProjetos/MeusProjetos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Descobrir from './Pages/Descobrir/Descobrir'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MeusProjetos/>}/>
        <Route path='/meus-projetos' element={<MeusProjetos/>}/>
        <Route path='/descobrir' element={<Descobrir />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
