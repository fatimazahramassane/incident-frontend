import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register(formData);
      alert('Compte créé avec succès !');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Créer un compte</h1>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="fullName" placeholder="Nom complet" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={styles.input} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.input} required />
          <input name="password" type="password" placeholder="Mot de passe" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={styles.input} required />
          <button type="submit" style={styles.button}>S'inscrire</button>
        </form>
        <p style={styles.link}>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7fafc' },
  card: { background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { textAlign: 'center', marginBottom: '1.5rem', color: '#2d3748' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.75rem', border: '1px solid #cbd5e0', borderRadius: '4px' },
  button: { padding: '0.75rem', background: '#4299e1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  error: { background: '#fed7d7', color: '#c53030', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' },
  link: { textAlign: 'center', marginTop: '1rem' },
};

export default Register;