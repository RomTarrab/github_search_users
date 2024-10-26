import { FC } from 'react';
import GitHubUserCard from './GitHubUserCard';
import { UserListProps } from '../interfaces/UserListProps.interface';

const UserList: FC<UserListProps> = ({ users, loading, error, query }) => (
    <div className="list-of-users">
        {error && <div className='error-message'>{error}</div>}
        {loading && <p>Loading users...</p>}
        {!loading && users.length === 0 && query && (
            <p className='no-results'>No users found. Try searching for a different term.</p>
        )}
        {users.map((user) => (
            <GitHubUserCard key={user.username} userInfo={user} />
        ))}
    </div>
);

export default UserList;
