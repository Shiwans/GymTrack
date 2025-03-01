import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ element, requiredRole }) => {
  const { token, role, loading } = useAuth();

  console.log('PrivateRoute - Token:', token);
  console.log('PrivateRoute - Role:', role);
  console.log('PrivateRoute - Loading:', loading);

  if (loading) {
    console.log('PrivateRoute - Loading state, returning loading indicator');
    return <div>Loading...</div>;
  }

  if (!token) {
    console.log('PrivateRoute - Token missing, redirecting to /login');
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    console.log('PrivateRoute - Incorrect role, redirecting to /');
    return <Navigate to="/" />;
  }

  console.log('PrivateRoute - Authorized, rendering element');
  return element;
};

export { PrivateRoute };