import React from 'react';

import { Modal, Box, IconButton, Chip  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from'./modal.module.css';
import { showAvatar, showImg } from '../../../components/functions';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: window.innerWidth <= 400 ? "100vh" : "70vh",
    bgcolor: "background.paper",
    overflowY: "auto",
    overflowX: "auto",
    boxShadow: 24,
    p: 4,
    padding: 10,
    margin: 0,
  };

  const styleBtn = {
    position: 'absolute', 
    top: 20, 
    right: 25, 
    color: 'black' 
  }

const ModalProjeto = ({ open, handleClose, card }) => {

    const formatDate = (fullDate) => {
        const date = new Date(fullDate);
        const options = { year: 'numeric', month: '2-digit' };
        return date.toLocaleDateString('pt-BR', options);
    }

    return(
        <>
            {open && (
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    
                    {card && (
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
                            <div className={styles.modalContent}>
                                <div className={styles.HorizontalContainer}>
                                    <div className={styles.informacoes}>
                                        <img src={showAvatar(card.avatar)} alt="" />
                                        <p>{card.name} {card.lastName}<br /> {formatDate(card.createdAt)}</p>
                                    </div>

                                        <h3>{card.title}</h3>
    
                                    <div className={styles.tag}>
                                        {card.tags.map((tag, index) => (
                                            <React.Fragment key={index}>
                                                <span className='tag'>{tag}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.projeto}>
                                    <img src={showImg(card.projectImage)} alt="" sizes='100'/>

                                    {/* mobile */}
                                    <div className={styles.informacoesResponsive}>
                                        <img src={showAvatar(card.avatar)} alt="" />
                                        <p>{`${card.name} ${card.lastName} • ${formatDate(card.createdAt)}`}</p>

                                        <div className={styles.tagsResponsive}>
                                        {card.tags.map((tag, index) => (
                                            <Chip label={tag} key={index} />
                                        ))}
                                    </div>
                                    </div>
                                    {/* ====== */}

                                    <p>{card.description}</p>
                                    <p>Download</p>
                                    <a href={card.urlGithub}>{card.urlGithub}</a>
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