import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    
    return <Navigate to="/" replace />;
  }

  // Se houver token, renderize o componente filho
  return children;
};

export default ProtectedRoute;