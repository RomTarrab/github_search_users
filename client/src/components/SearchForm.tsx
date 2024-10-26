import { FC } from 'react';
import { SearchFormProps } from '../interfaces/SearchFormProps.interface';

const SearchForm: FC<SearchFormProps> = ({ query, onInputChange }) => (
    <form onSubmit={(e) => e.preventDefault()}>
        <input
            type="text"
            value={query}
            onChange={onInputChange}
            placeholder="Search GitHub User..."
            className="searching_input"
        />
    </form>
);

export default SearchForm;
