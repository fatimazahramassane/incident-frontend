import { useState, useEffect } from 'react';
import api from '../services/api';

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const toggleUser = async (id, currentEnabled) => {
    try {
      const url = currentEnabled ? `/admin/users/${id}/disable` : `/admin/users/${id}/enable`;
      await api.put(url);
      setUsers(users.map(u => u.id === id ? { ...u, enabled: !currentEnabled } : u));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Gestion des utilisateurs (ADMIN)</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nom</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Rôle</th>
            <th style={styles.th}>Statut</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={styles.td}>{user.fullName}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>{user.enabled ? '✅ Actif' : '❌ Désactivé'}</td>
              <td style={styles.td}>
                <button onClick={() => toggleUser(user.id, user.enabled)} style={styles.btn}>
                  {user.enabled ? 'Désactiver' : 'Activer'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
  th: { background: '#edf2f7', padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #cbd5e0' },
  td: { padding: '0.75rem', borderBottom: '1px solid #e2e8f0' },
  btn: { padding: '0.5rem 1rem', background: '#ed8936', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default AdminUsers;