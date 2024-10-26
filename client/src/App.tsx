import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from './hooks/useDebounce.hook';
import { GitHubUser } from './interfaces/GitHubUser.interface';

import Title from './components/Title';
import SearchForm from './components/SearchForm';
import UserList from './components/UserList';
import PaginationComponent from './components/PaginationComponent';
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
      setUsers([]);

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
        if (axios.isAxiosError(error)) {
          console.log(error.status)
          console.error(error.response);
        } else {
          console.error(error)
        }
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
      <Title />
      <SearchForm query={query} onInputChange={handleInputChange} />
      <UserList
        users={users}
        loading={loading}
        error={error}
        query={debouncedQuery}
      />
      {debouncedQuery && users.length > 0 && (
        <PaginationComponent
          currentPage={page}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          isNextDisabled={loading || users.length < perPage}
          isPreviousDisabled={page === 1 || loading}
        />
      )}
    </div>
  );
};

export default App;