import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import GitHubUserCard from './components/GitHubUserCard';
import { useDebounce } from './hooks/useDebounce.hook';
import { GitHubUser } from './interfaces/GitHubUser.interface';

import './styles/App.scss';

const App: FC = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const perPage = 10;

  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8080/api/search_github_users`, {
          params: {
            q: debouncedQuery,
            page,
            per_page: perPage,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching GitHub users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery, page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className='app'>
      <h1 className='HomePageTitle'>GitHub User Search</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={query}
          onChange={handleInputChange} // Use the separate change handler
          placeholder='Search GitHub User...'
          className='searching_input'
        />
        {/* <button className='search-btn' type='submit' disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button> */}
      </form>

      {error && <div className='error-message'>{error}</div>}

      <div className="list-of-users">
        {loading && <p>Loading users...</p>}
        {!loading && users.length === 0 && debouncedQuery && (
          <p className='no-results'>No users found. Try searching for a different term.</p>
        )}
        {users.map((user) => (
          <GitHubUserCard key={user.username} userInfo={user} />
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 1 || loading}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={loading || users.length < perPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
