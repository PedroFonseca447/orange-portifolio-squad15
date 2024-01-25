
import { Modal, Box } from '@mui/material';
import './descobrir.css';

import { cardsData } from '../../components/cardsData';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1042,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalProjeto = ({ open, handleClose }) => {

    return(
        <>
            {open && (
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        
                    </Box>
                </Modal>
            )}
        </>
    )
}

export default ModalProjeto;