import { Link, useParams } from 'react-router-dom';
import { users } from '../data/users.js';

export default function UserDetail() {
  const { id } = useParams();

  const user = users.find(
    (user) => user.id === Number(id)
  );

  if (!user) {
    return (
      <div>
        <h1>User Not Found</h1>
        <Link to="/users">Back to Users</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>User Details</h1>

      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <Link to="/users">Back to Users</Link>
    </div>
  );
}