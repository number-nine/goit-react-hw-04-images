import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = ({ onLoadMore, isLoading, query }) => {
  return (
    <button
      type="button"
      className={css.Button}
      onClick={onLoadMore}
      disabled={isLoading}
    >
      Load more <i>{query}</i>
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,

};

export default Button;
