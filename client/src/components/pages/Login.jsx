import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(form);
      setMessage("Connexion réussie");
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
      <h2>Connexion</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <input className="form-control mb-3" name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input className="form-control mb-3" name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
      <button className="btn btn-success" type="submit">Se connecter</button>
    </form>
  );
}