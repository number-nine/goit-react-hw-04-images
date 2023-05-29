import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isQueryValid()) {
      onSubmit(query.trim());
      clearQuery();
      return;
    }
    Notify.failure('Enter valid query');
  };

  const isQueryValid = () => {
    return query.trim() !== '' ? true : false;
  };

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.SearchFormButton}
          // disabled={isLoading}
        >
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleChangeQuery}
          // disabled={isLoading}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // isLoading: PropTypes.bool.isRequired,
};

export default Searchbar;
