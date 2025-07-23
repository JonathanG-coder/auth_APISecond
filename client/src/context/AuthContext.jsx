import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    axios.get('/api/auth/me', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Connexion
  const login = async (credentials) => {
    const res = await axios.post('/api/auth/login', credentials, { withCredentials: true });
    setUser(res.data.user);
  };

  // Déconnexion
  const logout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Cette approche permet de gérer les appels API avec le cookie HTTP-only (grâce à withCredentials: true).