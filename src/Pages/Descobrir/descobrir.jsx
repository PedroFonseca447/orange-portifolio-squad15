import './descobrir.css';

import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import TextField from '@mui/material/TextField';

import { cardsData } from '../../components/cardsData';
import Menu from '../../components/Menu/Menu'; 
import ModalProjeto from './ModalProjeto/modal';
import DetalhesMobile from './detalhesMobile/detalhesMobile';

export default function Descobrir() {

    const [openModal, setOpenModal] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const navigate = useNavigate();

    const handleOpenModal = (cardId) => {
        setSelectedCardId(cardId);
        setOpenModal(true);
    };

    const handleClose = () => {
        setSelectedCardId(null);
        setOpenModal(false);
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
                        <div  key={card._id} onClick={() => handleImageClick(card._id)}>
                            
                            <div className='card' >
                                <img src={card.projectImage} alt={`Projeto ${card?.title}`}/>
                                    <div className='info-container'>
                                        <span>
                                            <img src={card.avatar} className='user' alt={`Avatar do ${card?.name}`} />
                                            <p>{`${card.name} ${card.lastName} • ${card.createdAt}`}</p>
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
                <ModalProjeto open={openModal} handleClose={handleClose} cardId={selectedCardId} />
        </>
    )
}