import React, { useState } from 'react'
import './card.css'
import { Chip, Paper, MenuItem, MenuList } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

const Card = ({data, onEditCard, onDeleteCard, user, showCard}) => {
    const page = window.location.pathname === "/descobrir"
    const [edit, setEdit] = useState(false)
    console.log(data);

  return (
    <div className='card'>
        <div className="card__img">
            {data?.user === user?._id && 
            <div className="card__edit">
                <label htmlFor="card__menu-open" onClick={() => setEdit(!edit)}>
                    <EditIcon className='card__edit-icon'/>
                </label>
                {edit && <Paper className='card__menu'>
                    <div className="triangulo">
                    </div>
                    <MenuList className='card__menu-list'>
                        <MenuItem onClick={() => {onEditCard(data); setEdit(false)}}>Editar</MenuItem>
                        <MenuItem onClick={() => {onDeleteCard(data); setEdit(false)}}>Excluir</MenuItem>
                    </MenuList>
                </Paper>}
            </div>}
            <img src={typeof data?.projectImage === 'object' ? URL.createObjectURL(data?.projectImage) : data?.projectImage} alt={data?.title}  onClick={() => showCard(data)}/>
        </div>
        <div className="card__info-tags">
            <span className='card__info'>
                <img src={data?.avatar} className='user' alt={`Foto de perfil da ${data?.name}`} />
                <p>{data?.name} {data?.lastName} • {data?.createdAt}</p>
            </span>
            {!page && <div className="card__tags">
                {data?.tags?.map(tag => (
                    <Chip label={tag} key={tag}/>
                ))}
            </div>}
        </div>
    </div>
  )
}

export default Card