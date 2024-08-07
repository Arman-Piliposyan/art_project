import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export const AuthRoute = () => {
  const token = localStorage.getItem('token');
  return !token ? <Outlet /> : <Navigate to={'/dashboard'} />;
};
