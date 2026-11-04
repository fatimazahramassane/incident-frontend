import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile(data);
        setFormData({ fullName: data.fullName, email: data.email });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Profil mis à jour !');
  };

  if (!profile) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Mon Profil</h2>
      {message && <div style={{ color: 'green', marginBottom: '1rem' }}>{message}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>Nom complet</label>
        <input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={styles.input} />
        <label>Email</label>
        <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.input} />
        <label>Rôle</label>
        <input value={profile.role} disabled style={styles.input} />
        <button type="submit" style={styles.button}>Enregistrer</button>
      </form>
    </div>
  );
}

const styles = {
  input: { padding: '0.75rem', border: '1px solid #cbd5e0', borderRadius: '4px' },
  button: { padding: '0.75rem', background: '#4299e1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default Profile;