import React, { FC } from 'react';
import { SearchFormProps } from '../interfaces/SearchFormProps.interface';

const SearchForm: FC<SearchFormProps> = ({ query, setQuery, handleSearch, loading }) => (
    <form onSubmit={handleSearch}>
        <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search GitHub User..."
            className="searching_input"
        />
        <button className="search-btn" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
        </button>
    </form>
);

export default SearchForm;
