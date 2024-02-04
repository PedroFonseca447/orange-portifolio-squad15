import { Modal, Box, IconButton, Chip, Tooltip, Typography  } from '@mui/material';
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

  if (window.innerWidth <= 400) {
    style.width = "90%";
  } else {
    style.width = "70%";
  }

  const styleBtn = {
    position: 'absolute', 
    top: 20, 
    right: 25, 
    color: 'black' 
  }

const ModalProjeto = ({ open, handleClose, card, user }) => {

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
                    
                    {card && user && (
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
                                        <img src={showAvatar(user.avatar)} alt="" />
                                        <p>{user.name} {user.lastName}<br /> {formatDate(card.createdAt)}</p>
                                    </div>

                                        <Typography variant='h4' sx={{alignSelf:'center'}}>{card.title}</Typography>
    
                                    <div className={styles.tag}>
                                        <Tooltip title={card?.tags?.join(' ')}>
                                        {card.tags.slice(0,3).map((tag, index) => (
                                            <Chip label={tag} key={index} />
                                        ))}
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className={styles.projeto}>
                                    <img src={showImg(card.projectImage)} alt="" sizes='100'/>

                                    {/* mobile */}
                                    <div className={styles.informacoesResponsive}>
                                        <img src={showAvatar(user.avatar)} alt="" />
                                        <p>{`${user.name} ${user.lastName} • ${formatDate(card.createdAt)}`}</p>

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