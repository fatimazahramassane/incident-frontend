import { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const role = localStorage.getItem('role');
  const fullName = localStorage.getItem('fullName');

  useEffect(() => {
    // On adapte la requête selon le rôle (Section 19 du PDF)
    const fetchStats = async () => {
      try {
        if (role === 'ADMIN') {
          const res = await api.get('/admin/statistics');
          setStats(res.data);
        } else if (role === 'TECHNICIAN') {
          const res = await api.get('/incidents/assigned');
          setStats({ total: res.data.length, message: "Incidents qui vous sont affectés" });
        } else {
          const res = await api.get('/incidents/my');
          setStats({ total: res.data.length, message: "Vos incidents déclarés" });
        }
      } catch (error) {
        console.error("Erreur chargement stats", error);
      }
    };
    fetchStats();
  }, [role]);

  return (
    <div>
      <h1>Bienvenue, {fullName} 👋</h1>
      <p style={{ color: '#666' }}>Votre rôle : <strong>{role}</strong></p>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <div style={styles.card}>
          <h3>Total</h3>
          <p style={styles.number}>{stats ? stats.total : '...'}</p>
        </div>
        <div style={styles.card}>
          <h3>Statut</h3>
          <p style={styles.number}>{stats?.message || 'Chargement...'}</p>
        </div>
      </div>

      {role === 'EMPLOYEE' && (
        <div style={{ marginTop: '2rem' }}>
          <a href="/new-incident" style={styles.button}>+ Déclarer un nouvel incident</a>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: { background: '#f7fafc', padding: '1.5rem', borderRadius: '8px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  number: { fontSize: '2rem', fontWeight: 'bold', color: '#2b6cb0', margin: 0 },
  button: { display: 'inline-block', padding: '0.75rem 1.5rem', background: '#2b6cb0', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }
};

export default Dashboard;