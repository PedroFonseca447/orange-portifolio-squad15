import React from 'react'
import { Link } from 'react-router-dom'
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import './menu.css'
import { Divider, MenuItem, MenuList, Paper } from '@mui/material';

const Menu = () => {
  return (
    <header id='menu'>
        <div className="menu__logo-links">
            <div className="menu__button-icon">
                <label htmlFor="button-icon">
                    <MenuIcon className='menu__icon'/>
                </label>
                <input type="checkbox" id='button-icon'/>
                <Paper className='responsive-menu'>
                    <MenuList>
                        <MenuItem>Meus projetos</MenuItem>
                        <MenuItem>Descobrir</MenuItem>
                        <Divider/>
                        <MenuItem>Configurações</MenuItem>
                    </MenuList>
                </Paper>
            </div>
            <img src='/imgs/Logo orange.png' alt='Logo Orange Portifólio' className='menu__logo'/>
            <ul className='menu__links'>
                <li><Link to={'/meus-projetos'} className='menu__link'>Meus projetos</Link></li>
                <li><Link to={'/descobrir'} className='menu__link'>Descobrir</Link></li>
            </ul>
        </div>
        <div className="menu__profile-notifications">
            <img src='/imgs/Image.png' alt='Sua foto de perfil' className='menu__profile'/>
            <NotificationsIcon className='menu__notifications'/>
        </div>
    </header>
  )
}

export default Menu