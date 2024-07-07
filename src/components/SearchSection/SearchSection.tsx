import { fetchItems } from '../../services/apiService';
import { SearchComponentState, SearchSectionProps } from '../../types';
import './SearchSection.scss';
import { Component } from 'react';

class SearchSection extends Component<SearchSectionProps, SearchComponentState> {
  state: SearchComponentState = {
    searchTerm: '',
    loading: false,
  };

  fetchInitialItems = async () => {
    const { searchTerm } = this.state;
    const { onSearchResults, onLoading } = this.props;

    try {
      this.setState({ loading: true });
      onLoading(true);
      const res = await fetchItems(searchTerm);
      onSearchResults(res);
    } catch (error) {
      console.error('Error fetching initial items:', error);
    } finally {
      this.setState({ loading: false });
      onLoading(false);
    }
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, this.fetchInitialItems);
    } else {
      this.fetchInitialItems();
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { searchTerm } = this.state;
    const { onSearchResults, onLoading } = this.props;
    const trimmedSearchTerm = searchTerm.trim();

    try {
      this.setState({ loading: true });
      onLoading(true);
      const res = await fetchItems(trimmedSearchTerm);
      localStorage.setItem('searchTerm', trimmedSearchTerm);
      onSearchResults(res);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
      onLoading(false);
    }
  };

  render() {
    const { searchTerm, loading } = this.state;

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
          <button type="submit" disabled={loading}>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchSection;
