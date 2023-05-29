import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, alt, onClose }) => {
  const handleClose = useCallback(
    e => {
      if (e.code === 'Escape' || e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    console.log('create listener');
    window.addEventListener('keydown', handleClose);
    return () => {
      console.log('remove listener');
      window.removeEventListener('keydown', handleClose);
    };
  }, [handleClose]);

  return createPortal(
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={image} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.protoTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
