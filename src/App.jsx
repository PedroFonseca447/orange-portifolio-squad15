import { useState } from 'react'
import MeusProjetos from './pages/MeusProjetos/MeusProjetos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MeusProjetos/>}/>
        <Route path='/meus-projetos' element={<MeusProjetos/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
