import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './alert.css'

const Alert = ({message, sucess}) => {
  return (
    <div className={`alert-${sucess}`}>
        <p className='alert-message'>
            {sucess ? <CheckIcon/> : <PriorityHighIcon/>}
            {message}
        </p>
    </div>
  )
}

export default Alert