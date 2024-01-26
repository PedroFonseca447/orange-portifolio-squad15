import './descobrir.css';

import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import TextField from '@mui/material/TextField';

import { cardsData } from '../../components/cardsData';
import Menu from '../../components/Menu/Menu'; 
import ModalProjeto from './ModalProjeto/modal';
import DetalhesMobile from './detalhesMobile/detalhesMobile';

export default function Descobrir() {

    const [openModal, setOpenModal] = useState(null);
    const navigate = useNavigate();

    const handleOpenModal = (cardId) => {
        setOpenModal(cardId);
    };

    const handleClose = () => {
        setOpenModal(null);
    };

    const handleImageClick = (cardId) => {
        if (window.innerWidth <= 500) {
          navigate(`/descobrir/${cardId}`);
        } else {
          handleOpenModal(cardId);
        }
      };

    return(
        <>
            <Menu />

            <div className='conteudo'>
                <h1>Junte-se à comunidade de inovação, inspiração e descobertas, transformando experiências em conexões inesquecíveis</h1>
                <br />
                <div className='input'>
                    <TextField
                        id="outlined"
                        label="Buscar tags"
                        style={{ width: '100%' }} 
                        />
                </div>
                <br />
                <div className='cardList'>
                    {cardsData.map((card) => (
                        <div  key={card.id} onClick={() => handleImageClick(card.id)}>
                            
                            <div className='card' >
                                <img src={card.cardImagem} alt=""/>
                                    <div className='info-container'>
                                        <span>
                                            <img src={card.usuario} className='user' alt="" />
                                            <p>{`${card.nome} • ${card.data}`}</p>
                                        </span>
    
                                        {/* mobile */}
                                        <div className='tags-mobile'>
                                            {card.tags.map((tag, index) => (
                                                <React.Fragment key={index}>
                                                    <span className='tag'>{tag}</span>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        {/* ===== */}
                                    </div>
                            </div>
                        </div>  
                    ))}
                </div>
            </div>
                <ModalProjeto open={openModal} handleClose={handleClose} cardId={openModal} />
        </>
    )
}