import { useAuth } from './AuthContext';
import { Navigate} from 'react-router-dom';

function PrivateRoute({ roles, children }) {
  const { isAuthenticated, userRole } = useAuth();
  console.log("isAuthenticated:", isAuthenticated);
  console.log("userRole:", userRole);
  console.log("roles:", roles);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // Перевірка доступу за роллю
  if (roles && roles.length && !roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
