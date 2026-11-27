import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to User Management</h1>
      <p>Manage and view user information.</p>

      <Link to="/users">View All Users</Link>
    </div>
  );
}