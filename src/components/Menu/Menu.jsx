import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Divider, MenuItem, MenuList, Paper } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import './menu.css'

const Menu = () => {
    const [notification, setNotification] = useState(true)
    const [showNotification, setShowNotification] = useState(false)
    const [progress, setProgress] = useState(0)
    const [steps, setSteps] = useState([])
    
    const user = {
        name: "Camila",
        lastName: "Soares",
        email: "camilaso@gmail.com",
        country: "",
        _id: 1,
        avatar: "src/assets/Bianca.png",
    };

    useEffect(() =>{
        if(user.avatar !== "" && user.country !== ""){
            setProgress(6)
        }else if(user.avatar === ""){
            setSteps(["Foto de perfil"])
            setProgress(5)
        }else if(user.country === ""){
            setSteps(["País"])
            setProgress(5)
        }else{
            setSteps(["País", "Foto de perfil"])
            setProgress(4)
        }
        console.log(progress);
    }, [])

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
            <Badge badgeContent={notification ? 1 : null} onClick={() => setShowNotification(!showNotification)}>
                <NotificationsIcon className='menu__notifications'/>
            </Badge>
            {showNotification && notification && 
            <Paper className='menu-notification'>
                <div className="triangulo"></div>
                <div className='menu-notification__content'>
                    <div className="close-notification">
                        <CloseIcon onClick={() => setNotification(false)}/>
                    </div>
                    <Link to={'/'} onClick={() => setShowNotification(false)}>
                        <h3>Complete seu cadastro</h3>
                        <div className="container-progress">
                            <div className="progress" style={{width: ((100 / 6) * progress)+'%'}}></div>
                        </div>
                        <ul>
                            {steps?.map((step) => (
                                <li key={step}>{step}</li>
                            ))}
                        </ul>
                    </Link>
                </div>
            </Paper>}
        </div>
    </header>
  )
}

export default Menu