import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getPictures from 'controllers/api-controller';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import css from './ImageGallery.module.css';

const perPage = 12;

const ImageGallery = ({ query }) => {
  const [currentData, setCurrentData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { value } = query;

  function canLoadMore() {
    return total > page * perPage;
  }

  useEffect(() => {
    if (!value) {
      return;
    }

    setIsLoading(true);

    getPictures({ page: page, query: value, perPage })
      .then(({ hits, total }) => {
        setCurrentData(state => [...state, ...hits]);
        setTotal(total);
      })
      .catch(error => {
        Notify.info(
          `Something went wrong. ${error.message}. Please try again later.`
        );
      })
      .finally(() => setIsLoading(false));
  }, [page, value, query]);

  useEffect(() => {
    setCurrentData([]);
    setPage(1);
    setTotal(0);
    
  }, [query]);

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <>
      {!currentData.length && (
        <p className={css.ImageGalleryMessage}>Nothing to show</p>
      )}
      <ul className={css.ImageGallery}>
        {Boolean(currentData.length) &&
          currentData.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              src={picture.webformatURL}
              alt={picture.tags}
              image={picture.largeImageURL}
            />
          ))}
      </ul>
      {canLoadMore() && (
        <Button onLoadMore={handleLoadMore} query={query.value} />
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.shape({ value: PropTypes.string }).isRequired,
};
