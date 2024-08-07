import { Navigate } from 'react-router-dom';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PrivateRoute = ({ children }: { [props: string]: any }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};
