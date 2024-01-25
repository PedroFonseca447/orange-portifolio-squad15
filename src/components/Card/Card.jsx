import React, { useState } from 'react'
import './card.css'
import { Chip, Paper, MenuItem, MenuList } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

const Card = ({data, onEditCard, onDeleteCard, user}) => {
    const page = window.location.pathname === "/descobrir"
    const [edit, setEdit] = useState(false)

  return (
    <div className='card'>
        <div className="card__img">
            {data?.idUser === user?.id && 
            <div className="card__edit">
                <label htmlFor="card__menu-open" onClick={() => setEdit(!edit)}>
                    <EditIcon className='card__edit-icon'/>
                </label>
                {edit && <Paper className='card__menu'>
                    <div className="triangulo">
                    </div>
                    <MenuList className='card__menu-list'>
                        <MenuItem onClick={() => onEditCard(data)}>Editar</MenuItem>
                        <MenuItem onClick={() => onDeleteCard(data)}>Excluir</MenuItem>
                    </MenuList>
                </Paper>}
            </div>}
            <img src={data?.fotoUser} alt={`Foto de perfil da ${data?.nome}`} />
        </div>
        <div className="card__info-tags">
            <span className='card__info'>
                <img src={data?.imagem} className='user' alt={data?.titulo} />
                <p>{data?.nome} {data?.sobrenome} • {data?.data}</p>
            </span>
            {!page && <div className="card__tags">
                {data?.tags?.map(tag => (
                    <Chip label={tag}/>
                ))}
            </div>}
        </div>
    </div>
  )
}

export default Card