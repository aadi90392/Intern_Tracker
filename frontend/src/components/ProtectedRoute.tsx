import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Naya import

interface Props {
  children: React.ReactNode;
  allowedRole?: 'admin' | 'intern';
}

export const ProtectedRoute = ({ children, allowedRole }: Props) => {
  const auth = useAuth(); // TypeScript ko ab exact pata hai auth kya hai

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && auth.user.role !== allowedRole) {
    return <Navigate to={`/${auth.user.role}`} replace />;
  }

  return <>{children}</>;
};