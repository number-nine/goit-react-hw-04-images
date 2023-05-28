import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  handleClose = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      onClose();
    }
  };

  componentDidMount() {
    
    window.addEventListener('keydown', this.handleClose);
  }
  render() {
    const { image, alt } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleClose}>
        <div className={css.Modal}>
          <img src={image} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.protoTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
