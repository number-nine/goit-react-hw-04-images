import { useState } from 'react';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

   const handleQuery = query => {
      setQuery(query);
      setIsLoading(true);
    };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleQuery} isLoading={isLoading} />
      <ImageGallery
        query={query}
        isLoading={isLoading}
        onLoadingStart={() => {
          setIsLoading(true);
        }}
        onLoadingComplete={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}

export default App;
