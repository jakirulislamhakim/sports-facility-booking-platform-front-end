import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { TAuthUser } from '../types';

type TProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: ('user' | 'admin')[];
};

const ProtectedRoute = ({ children, allowedRoles }: TProtectedRouteProps) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  try {
    const decodedUser = jwtDecode(token) as TAuthUser;

    if (allowedRoles && !allowedRoles.includes(decodedUser.role)) {
      return <Navigate to={'/unauthorized'} replace state={{ from: location }} />;
    }
  } catch (error) {
    console.error('invalid token', error);
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
