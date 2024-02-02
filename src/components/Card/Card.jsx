import React, { useState } from 'react'
import styles from './card.module.css'
import { showAvatar, showImg } from '../functions';
import { Chip, Paper, MenuItem, MenuList, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

const Card = ({data, onEditCard, onDeleteCard, user, showCard}) => {
    const page = window.location.pathname === "/descobrir"
    const [edit, setEdit] = useState(false)
    
    const newDate = new Date(data?.createdAt)

    const date = `${(newDate.getMonth()+1).toString().padStart(2, '0')}/${newDate.getFullYear().toString().substr(2)}`

  return (
    <div className={styles.card}>
        <div className={styles.card__img}>
            {data?.user === user?._id && 
            <div className={styles.card__edit}>
                <label htmlFor="card__menu-open" onClick={() => setEdit(!edit)}>
                    <EditIcon className={styles.card__editIcon}/>
                </label>
                {edit && 
                <Paper className={styles.card__menu}>
                    <div className={styles.triangulo}>
                    </div>
                    <MenuList className={styles.card__menuList}>
                        <MenuItem onClick={() => {onEditCard(data); setEdit(false)}}>Editar</MenuItem>
                        <MenuItem onClick={() => {onDeleteCard(data); setEdit(false)}}>Excluir</MenuItem>
                    </MenuList>
                </Paper>}
            </div>}
            <img src={showImg(data?.projectImage)} alt={data?.title}  onClick={() => showCard(data)}/>
        </div>
        <div className={styles.card__infoTags}>
            <span className={styles.card__info}>
                <img src={showAvatar(data?.avatar)} className={styles.user} alt={`Foto de perfil da ${user?.name}`} />
                <p>{user?.name} {user?.lastName} • {date}</p>
            </span>
            {!page && 
            <Tooltip title={data?.tags?.join(', ')}>
                <div className={styles.card__tags}>
                {data?.tags.slice(0,2).map((tag, index) => (
                    <Chip label={tag} key={index} />
                ))}
                </div>
            </Tooltip>}
        </div>
    </div>
  )
}

export default Card