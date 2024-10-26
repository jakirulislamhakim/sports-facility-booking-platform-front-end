import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAppSelector((state: RootState) => state.auth);

  if (!token && !user) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
