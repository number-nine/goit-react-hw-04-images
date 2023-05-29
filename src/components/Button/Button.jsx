import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = ({ onLoadMore, query }) => {
  return (
    <button
      type="button"
      className={css.Button}
      onClick={onLoadMore}
    >
      Load more <i>{query}</i>
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,

};

export default Button;
