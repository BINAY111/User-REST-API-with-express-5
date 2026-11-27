import { Link } from 'react-router-dom';
import { users } from '../data/users.js';

export default function Users() {
  return (
    <div>
      <h1>Users List</h1>

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>

          <Link to={`/users/${user.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}