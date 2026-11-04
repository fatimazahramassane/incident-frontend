import { useState, useEffect } from 'react';
import api from '../services/api';

function MyIncidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await api.get('/incidents/my');
        setIncidents(res.data);
      } catch (error) {
        console.error("Erreur chargement incidents", error);
      }
    };
    fetchIncidents();
  }, []);

  return (
    <div>
      <h2>Mes incidents déclarés</h2>
      {incidents.length === 0 ? (
        <p>Aucun incident déclaré pour le moment.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Titre</th>
              <th style={styles.th}>Catégorie</th>
              <th style={styles.th}>Priorité</th>
              <th style={styles.th}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(inc => (
              <tr key={inc.id}>
                <td style={styles.td}>{inc.title}</td>
                <td style={styles.td}>{inc.category}</td>
                <td style={styles.td}>
                  <span style={{ 
                    color: inc.priority === 'CRITICAL' ? 'red' : 'inherit', 
                    fontWeight: 'bold' 
                  }}>
                    {inc.priority}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={styles.badge}>{inc.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
  th: { background: '#edf2f7', padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #cbd5e0' },
  td: { padding: '0.75rem', borderBottom: '1px solid #e2e8f0' },
  badge: { background: '#bee3f8', color: '#2b6cb0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }
};

export default MyIncidents;