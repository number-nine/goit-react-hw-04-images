import { Component } from 'react';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    isLoading: false,
  };

  handleQuery = query => {
    this.setState({
      query,
    });
    this.setLoadingStatus();
  };

  setLoadingStatus = () => {
    this.setState({
      isLoading: true,
    });
  };

  unsetLoadingStatus = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { query, isLoading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleQuery} isLoading={isLoading} />
        <ImageGallery
          query={query}
          isLoading={isLoading}
          onLoadingStart={this.setLoadingStatus}
          onLoadingComplete={this.unsetLoadingStatus}
        />
      </div>
    );
  }
}

export default App;
