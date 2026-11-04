import { Navigate } from 'react-router-dom';

function RoleRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (userRole !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default RoleRoute;