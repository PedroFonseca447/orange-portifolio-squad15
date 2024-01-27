import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './modalstatus.css'

const ModalStatus = ({message, sucess, messageButton, action}) => {
  return (
    <main className="background-modal">
        <section className="modal-status">
            <h2>{message}</h2>
            <div className={`icon-status-${sucess}`}>
                {sucess ? <CheckIcon/> : <PriorityHighIcon/>}
            </div>
            <button onClick={action} className='modal-status__button'>{messageButton}</button>
        </section>
    </main>
  )
}

export default ModalStatus