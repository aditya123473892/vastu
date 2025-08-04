import React from 'react';
import { useAuth } from './authcontext';
import LoginPage from '../Pages/Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return children;
};

export default ProtectedRoute;
