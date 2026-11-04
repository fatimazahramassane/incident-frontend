import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyIncidents from './pages/MyIncidents';
import NewIncident from './pages/NewIncident';
import AssignedIncidents from './pages/AssignedIncidents';
import AdminUsers from './pages/AdminUsers';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes protégées pour tous les connectés */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* Routes EMPLOYEE */}
          <Route path="/my-incidents" element={<ProtectedRoute><MyIncidents /></ProtectedRoute>} />
          <Route path="/new-incident" element={<ProtectedRoute><NewIncident /></ProtectedRoute>} />
          
          {/* Routes TECHNICIAN */}
          <Route path="/assigned-incidents" element={<ProtectedRoute><AssignedIncidents /></ProtectedRoute>} />
          
          {/* Routes ADMIN uniquement */}
          <Route path="/admin/users" element={<RoleRoute requiredRole="ADMIN"><AdminUsers /></RoleRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;