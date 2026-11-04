import { useState, useEffect } from 'react';
import api from '../services/api';

function AssignedIncidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await api.get('/incidents/assigned');
        setIncidents(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIncidents();
  }, []);

  return (
    <div>
      <h2>Incidents qui me sont affectés</h2>
      {incidents.length === 0 ? <p>Aucun incident affecté.</p> : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Titre</th>
              <th style={styles.th}>Priorité</th>
              <th style={styles.th}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(inc => (
              <tr key={inc.id}>
                <td style={styles.td}>{inc.title}</td>
                <td style={styles.td}>{inc.priority}</td>
                <td style={styles.td}>{inc.status}</td>
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
};

export default AssignedIncidents;