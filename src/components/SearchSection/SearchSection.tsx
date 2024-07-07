import './SearchSection.scss';
import { Component } from 'react';

class SearchSection extends Component {
  handleSearch = () => {
    console.log('Search clicked');
  };

  render() {
    return (
      <div className="searchSection">
        <h1>Search movies</h1>
        <div className="searchRow">
          <input className="search" type="text" />
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchSection;
