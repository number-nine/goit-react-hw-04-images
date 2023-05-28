import PropTypes from 'prop-types';
import { useState } from 'react';

import Modal from 'components/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, ...transitProps }) => {
  const [isModalShown, setIsModalShown] = useState(false);

  const handleModalClose = () => {
    setIsModalShown(false);
  };

  const handleModalOpen = () => {
    setIsModalShown(true);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        className={css.ImageGalleryItemImage}
        onClick={handleModalOpen}
      />
      {isModalShown && (
        <Modal alt={alt} onClose={handleModalClose} {...transitProps} />
      )}
    </li>
  );
};


ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
