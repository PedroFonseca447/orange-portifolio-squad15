import React, { useState } from 'react'
import styles from './card.module.css'
import { Chip, Paper, MenuItem, MenuList } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

const Card = ({data, onEditCard, onDeleteCard, user, showCard}) => {
    const page = window.location.pathname === "/descobrir"
    const [edit, setEdit] = useState(false)

    const showImg = (img) =>{
        if(typeof data?.projectImage === 'object'){
            return URL.createObjectURL(img)
        }else if(img.startsWith('src')){
            return `htpp://localhost:3000/${img}`
        }else{
            return img;
        }
    }

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
                <img src={showImg(data?.avatar)} className={styles.user} alt={`Foto de perfil da ${data?.name}`} />
                <p>{data?.name} {data?.lastName} • {data?.createdAt}</p>
            </span>
            {!page && <div className={styles.card__tags}>
                {data?.tags?.map(tag => (
                    <Chip label={tag} key={tag}/>
                ))}
            </div>}
        </div>
    </div>
  )
}

export default Card