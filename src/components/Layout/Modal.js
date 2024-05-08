import React from 'react'

function Modal(props) {
    return (
        <>
        <div className='layer'>
          <button onClick={props.onClick}>close</button>
          <div className='modalWrap'>
            {props.viewlistData[props.moNum]}
            </div>
        </div>
        </>
      )
}

export default Modal