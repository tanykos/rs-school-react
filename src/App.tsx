import './styles/App.scss';
import ResultsSection from './components/ResultsSection/ResultsSection';
import SearchSection from './components/SearchSection/SearchSection';
import { AppState, Movie } from './types';
import { Component } from 'react';

class App extends Component<object, AppState> {
  state: AppState = {
    results: [],
  };

  handleSearchResults = (results: Movie[]) => {
    this.setState({ results });
  };

  render() {
    return (
      <div className="app">
        <SearchSection onSearchResults={this.handleSearchResults} />
        <ResultsSection results={this.state.results} />
      </div>
    );
  }
}

export default App;
