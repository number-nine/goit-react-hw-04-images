import { Component } from 'react';
import PropTypes from 'prop-types';

import getPictures from 'controllers/api-controller';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    currentData: null,
    page: 1,
    total: 0,
    perPage: 12,
    canLoadMore: false,
  };

  async componentDidUpdate(_, {page:prevPage, currentData:prevData}) {
    const { query } = this.props;
    const { page, perPage, currentData, total } = this.state;

    if (prevPage === page && prevData === currentData) {
      const { hits, total } = await getPictures({
        page: 1,
        query,
        perPage,
      });

      this.setState({
        currentData: hits,
        page: 1,
        total,
        canLoadMore: total > perPage,
      });

      this.props.onLoadingComplete();

      return;
    }

    if (page > prevPage) {
      const { hits } = await getPictures({
        page,
        query,
        perPage,
      });
      this.setState({
        currentData: [...currentData, ...hits],
        canLoadMore:
          total - perPage * page > 0,
      });

      this.props.onLoadingComplete();

      return;
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.props.onLoadingStart();
  };

  render() {
    const { isLoading, query } = this.props;
    const { currentData, canLoadMore } = this.state;
    return (
      <>
        {!currentData?.length && (
          <p className={css.ImageGalleryMessage}>Nothing to show</p>
        )}
        <ul className={css.ImageGallery}>
          {currentData &&
            currentData.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                src={picture.webformatURL}
                alt={picture.tags}
                image={picture.largeImageURL}
              />
            ))}
        </ul>
        {canLoadMore && (
          <Button
            onLoadMore={this.handleLoadMore}
            isLoading={isLoading}
            query={query}
          />
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLoadingStart: PropTypes.func.isRequired,
  onLoadingComplete: PropTypes.func.isRequired,
};
