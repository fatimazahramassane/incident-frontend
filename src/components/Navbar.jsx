import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const fullName = localStorage.getItem('fullName');

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🛡️ Incident Manager</div>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/profile" style={styles.link}>Profil</Link>
        {role === 'EMPLOYEE' && (
          <>
            <Link to="/my-incidents" style={styles.link}>Mes Incidents</Link>
            <Link to="/new-incident" style={styles.link}>Nouvel Incident</Link>
          </>
        )}
        {role === 'TECHNICIAN' && (
          <Link to="/assigned-incidents" style={styles.link}>Incidents Affectés</Link>
        )}
        {role === 'ADMIN' && (
          <Link to="/admin/users" style={styles.link}>Utilisateurs</Link>
        )}
      </div>
      <div style={styles.user}>
        <span>{fullName} ({role})</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>Déconnexion</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#2d3748', color: 'white' },
  logo: { fontSize: '1.25rem', fontWeight: 'bold' },
  links: { display: 'flex', gap: '1.5rem' },
  link: { color: '#cbd5e0', textDecoration: 'none', fontWeight: '500' },
  user: { display: 'flex', alignItems: 'center', gap: '1rem' },
  logoutBtn: { padding: '0.5rem 1rem', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default Navbar;