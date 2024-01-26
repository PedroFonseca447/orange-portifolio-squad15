import React from 'react';

import { Modal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './modal.css';

import { cardsData } from '../../../components/cardsData';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: window.innerWidth <= 400 ? '100vh' : '70vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 10,
    margin: 0,

  };

const ModalProjeto = ({ open, handleClose, cardId }) => {

    const cardSelecionado = cardsData.find(card => card.id === cardId);

    return(
        <>
            {open && (
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    
                    {cardSelecionado && (
                        <Box sx={style}>
                            <div className='modal-content'>
                                <div className='Horizontal-container'>
                                    <div className='informacoes'>
                                        <img src={cardSelecionado.usuario} alt="" />
                                        <p>{cardSelecionado.nome} <br /> {cardSelecionado.data}</p>
                                    </div>

                                        <h3>{cardSelecionado.titulo}</h3>
    
                                    <div className='tags'>
                                        {cardSelecionado.tags.map((tag, index) => (
                                            <React.Fragment key={index}>
                                                <span className='tag'>{tag}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <div className='projeto'>
                                    <img src={cardSelecionado.cardImagem} alt="" sizes='100'/>

                                    {/* mobile */}
                                    <div className='informacoes-responsive'>
                                        <img src={cardSelecionado.usuario} alt="" />
                                        <p>{`${cardSelecionado.nome} • ${cardSelecionado.data}`}</p>

                                        <div className='tags-responsive'>
                                        {cardSelecionado.tags.map((tag, index) => (
                                            <React.Fragment key={index}>
                                                <span className='tag'>{tag}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    </div>
                                    {/* ====== */}

                                    <p>{cardSelecionado.descricao}</p>
                                    <p>Download</p>
                                    <a href={cardSelecionado.link}>{cardSelecionado.link}</a>
                                </div>
                            </div>    
                        </Box>
                    )}
                </Modal>
            )}
        </>
    )
}

export default ModalProjeto;