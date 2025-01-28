import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;