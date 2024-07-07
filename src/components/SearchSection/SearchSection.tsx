import { fetchItems } from '../../services/apiService';
import { SearchComponentState, SearchSectionProps } from '../../types';
import './SearchSection.scss';
import { Component } from 'react';

class SearchSection extends Component<SearchSectionProps, SearchComponentState> {
  state: SearchComponentState = {
    searchTerm: '',
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Search clicked: ');

    const { searchTerm } = this.state;
    const { onSearchResults } = this.props;
    const trimmedSearchTerm = searchTerm.trim();

    try {
      const res = await fetchItems(trimmedSearchTerm);
      console.log('IN Search: ', res);
      localStorage.setItem('searchTerm', trimmedSearchTerm);
      onSearchResults(res);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="searchSection">
        <h1>Search movies</h1>
        <form onSubmit={this.handleSearch} className="searchRow">
          <input
            className="search"
            type="text"
            value={searchTerm}
            onChange={this.handleInputChange}
            placeholder="Enter a word in English..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchSection;
