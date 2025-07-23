import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const res = await axios.post('/api/auth/register', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur serveur');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
      <h2>Inscription</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <input className="form-control mb-2" name="name" placeholder="Nom complet" onChange={handleChange} required />
      <input className="form-control mb-2" name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input className="form-control mb-2" name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
      <input className="form-control mb-3" name="confirmPassword" type="password" placeholder="Confirmer mot de passe" onChange={handleChange} required />
      <button className="btn btn-primary" type="submit">Créer un compte</button>
    </form>
  );
}