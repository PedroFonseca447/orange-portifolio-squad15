import React, { useState } from 'react'
import './meusprojetos.css'
import Menu from '../../components/Menu/Menu'
import TextField from '@mui/material/TextField';
import CollectionsIcon from '@mui/icons-material/Collections';

const MeusProjetos = () => {
  const user = {
    name: 'Camila Soares',
    country: 'Brasil'
  }
  const [projetos, setProjetos] = useState([])
  return (
    <>
        <Menu/>
        <section className="card-perfil">
          <img src='/imgs/Image.png' alt='Sua foto de perfil' className='card-perfil__img'/>
          <div className="card-perfil__info">
            <div className="card-perfil__info-user">
              <h3>{user.name}</h3>
              <span>{user.country}</span>
            </div>
            <button>Adicionar projeto</button>
          </div>
        </section>
        <main className='meus-projetos'>
          <h6>Meus projetos</h6>
          <TextField 
            id="outlined"
            label="Buscar tags"
            className='meus-projetos__input-tags'/>
          {projetos.length === 0 ? 
            <div className='meus-projetos__add-projetos'>
              <CollectionsIcon className='add-projetos__icon'/>
              <p>Adicione seu primeiro projeto</p>
              <p>Compartilhe seu talento com milhares de pessoas</p>
            </div> :
            <div>

            </div>
          }
        </main>
    </>
  )
}

export default MeusProjetos