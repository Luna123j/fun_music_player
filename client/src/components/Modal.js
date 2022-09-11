import React, {useState} from 'react';
import  ReactDom  from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

export default function Modal( open, onClose ) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={MODAL_STYLES}>
        <button onClick={onClose}>Close Modal</button>
        playList
      </div>
    </>,
    document.getElementById('portal')
  )
}
