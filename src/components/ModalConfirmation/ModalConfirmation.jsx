import React from 'react'
import './modalconfirmation.css'

const ModalConfirmation = ({title, message, action, cancel, textConfirm}) => {
  return (
    <main className="background-modal">
        <section className="modal-confirmation">
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="modal-confirmation__buttons">
                <button onClick={action} className='modal-confirmation__buttons-confirm'>{textConfirm}</button>
                <button onClick={cancel} className='modal-confirmation__buttons-cancel'>Cancelar</button>
            </div>
        </section>
    </main>
  )
}

export default ModalConfirmation