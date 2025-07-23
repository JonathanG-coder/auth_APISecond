import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Bienvenue, {user?.name} !</h2>
      <button className="btn btn-danger" onClick={logout}>Se déconnecter</button>
    </div>
  );
}