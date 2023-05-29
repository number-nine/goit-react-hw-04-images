import { useState } from 'react';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState({ value :''});

  const handleQuery = value => {
    setQuery({value});
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleQuery} />
      <ImageGallery query={query} />
    </div>
  );
};

export default App;
