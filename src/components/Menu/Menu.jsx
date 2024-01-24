import React from 'react'
import { Link } from 'react-router-dom'
import NotificationsIcon from '@mui/icons-material/Notifications';

const Menu = () => {
  return (
    <header>
        <div className="menu__logo-links">
            <img src='/imgs/Logo orange.png' alt='Logo Orange Portifólio'/>
            <ul>
                <li><Link to={'/meus-projetos'}>Meus projetos</Link></li>
                <li><Link to={'/descobrir'}>Descobrir</Link></li>
            </ul>
        </div>
        <div className="menu__perfil-notifications">
            <img src='/imgs/Image.png' alt='Sua foto de perfil'/>
            <NotificationsIcon/>
        </div>
    </header>
  )
}

export default Menu