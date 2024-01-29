import React from 'react'
import styles from './modalconfirmation.module.css'
import { Modal } from '@mui/material'

const ModalConfirmation = ({title, message, action, cancel, textConfirm}) => {
  return (
    <Modal 
      open={true}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <section className={styles.modalConfirmation}>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className={styles.modalConfirmation__buttons}>
                <button onClick={action} className={styles.modalConfirmation__buttonsConfirm}>{textConfirm}</button>
                <button onClick={cancel} className={styles.modalConfirmation__buttonsCancel}>Cancelar</button>
            </div>
        </section>
    </Modal>
  )
}

export default ModalConfirmation