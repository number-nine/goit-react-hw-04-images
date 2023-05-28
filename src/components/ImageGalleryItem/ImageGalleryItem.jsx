import PropTypes from 'prop-types';
import { Component } from 'react';

import Modal from 'components/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isModalShown: false,
  };

  handleModalClose = e => {
    // if (e.target === e.currentTarget) {
    this.setState({ isModalShown: false });
    // }
  };

  handleModalOpen = () => {
    this.setState({ isModalShown: true });
  };

  render() {
    const { src, alt, ...transitProps } = this.props;
    const { isModalShown } = this.state;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          src={src}
          alt={alt}
          className={css.ImageGalleryItemImage}
          onClick={this.handleModalOpen}
        />
        {isModalShown && (
          <Modal alt={alt} onClose={this.handleModalClose} {...transitProps} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
