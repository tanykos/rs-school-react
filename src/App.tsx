import './styles/App.scss';
import ResultsSection from './components/ResultsSection/ResultsSection';
import SearchSection from './components/SearchSection/SearchSection';
import { AppState, Movie } from './types';
import { Component } from 'react';

class App extends Component<object, AppState> {
  state: AppState = {
    results: [],
    loading: false,
  };

  handleSearchResults = (results: Movie[]) => {
    this.setState({ results });
  };

  handleOnLoading = (loading: boolean) => {
    this.setState({ loading });
  };

  render() {
    return (
      <div className="app">
        <SearchSection onSearchResults={this.handleSearchResults} onLoading={this.handleOnLoading} />
        <ResultsSection results={this.state.results} loading={this.state.loading} />
      </div>
    );
  }
}

export default App;
