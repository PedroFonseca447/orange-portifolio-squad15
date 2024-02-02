import React from 'react';

import { Modal, Box, IconButton  } from '@mui/material';
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
    overflowY: 'auto',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 10,
    margin: 0,
  };

  const styleBtn = {
    position: 'absolute', 
    top: 10, 
    right: 15, 
    color: 'black' 
  }

const ModalProjeto = ({ open, handleClose, cardId }) => {

    const cardSelecionado = cardsData.find(card => card._id === cardId);

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

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={styleBtn}
                        >
                            <CloseIcon />
                        </IconButton>
                            <div className='modal-content'>
                                <div className='Horizontal-container'>
                                    <div className='informacoes'>
                                        <img src={cardSelecionado.avatar} alt={`Avatar do ${cardSelecionado?.name}`} />
                                        <p>{cardSelecionado.name} {cardSelecionado.lastName}<br /> {cardSelecionado.createdAt}</p>
                                    </div>

                                        <h3>{cardSelecionado.title}</h3>
    
                                    <div className='tags'>
                                        {cardSelecionado.tags.map((tag, index) => (
                                            <React.Fragment key={index}>
                                                <span className='tag'>{tag}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <div className='projeto'>
                                    <img src={cardSelecionado.projectImage} alt={`Projeto ${cardSelecionado?.title}`} sizes='100'/>

                                    {/* mobile */}
                                    <div className='informacoes-responsive'>
                                        <img src={cardSelecionado.avatar} alt={`Avatar do ${cardSelecionado?.name}`} />
                                        <p>{`${cardSelecionado.name} ${cardSelecionado.lastName} • ${cardSelecionado.createdAt}`}</p>

                                        <div className='tags-responsive'>
                                        {cardSelecionado.tags.map((tag, index) => (
                                            <React.Fragment key={index}>
                                                <span className='tag'>{tag}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    </div>
                                    {/* ====== */}

                                    <p>{cardSelecionado.description}</p>
                                    <p>Download</p>
                                    <a href={cardSelecionado.urlGithub}>{cardSelecionado.urlGithub}</a>
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