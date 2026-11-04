import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function NewIncident() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'OTHER', priority: 'MEDIUM'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/incidents', formData);
      alert('Incident déclaré avec succès !');
      navigate('/my-incidents');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Déclarer un nouvel incident</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          placeholder="Titre de l'incident" 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          style={styles.input} required 
        />
        <textarea 
          placeholder="Description détaillée" 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})} 
          style={{...styles.input, minHeight: '100px'}} required 
        />
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={styles.input}>
            <option value="NETWORK">Réseau (NETWORK)</option>
            <option value="MALWARE">Malware</option>
            <option value="PHISHING">Phishing</option>
            <option value="ACCESS">Problème d'accès</option>
            <option value="SOFTWARE">Logiciel</option>
            <option value="HARDWARE">Matériel</option>
            <option value="DATA_LEAK">Fuite de données</option>
            <option value="OTHER">Autre</option>
          </select>

          <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} style={styles.input}>
            <option value="LOW">Basse (LOW)</option>
            <option value="MEDIUM">Moyenne (MEDIUM)</option>
            <option value="HIGH">Haute (HIGH)</option>
            <option value="CRITICAL">Critique (CRITICAL)</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Soumettre l'incident</button>
      </form>
    </div>
  );
}

const styles = {
  input: { padding: '0.75rem', border: '1px solid #cbd5e0', borderRadius: '4px', fontSize: '1rem' },
  button: { padding: '0.75rem', background: '#2b6cb0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }
};

export default NewIncident;