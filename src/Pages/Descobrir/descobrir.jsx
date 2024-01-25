import './descobrir.css';
import Menu from '../../components/Menu/Menu'; 
import { cardsData } from '../../components/cardsData';

import { Button, Modal, Backdrop, Fade } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import React,{ useState } from 'react';

import ModalProjeto from './modal';

export default function Descobrir() {

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return(
        <>
            <Menu />

            <div className='conteudo'>
                <h1>Junte-se à comunidade de inovação, inspiração e descobertas, transformando experiências em conexões inesquecíveis</h1>
                <br />
                <TextField
                    id="outlined"
                    label="Buscar tags"
                    style={{ width: '30%' }} 
                />
                <br />

                <div className='cards'>
                    {cardsData.map((card, index) => (
                        <div key={card.id}>
                            
                                <div className='card' onClick={handleOpenModal}>
                                    <img src={card.cardImagem} alt="" />
                                    <span>
                                        <img src={card.usuario} className='user' alt="" />
                                        <p>{`${card.nome} • ${card.data}`}</p>
                                    </span>
                                </div>
                           
                        </div>  
                    ))}
                </div>

            </div>

           <ModalProjeto open={openModal} handleClose={handleClose} />

        </>
    )
}