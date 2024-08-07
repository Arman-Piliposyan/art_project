import React from 'react';

import { LoginForm } from './LoginForm';

import { AuthContent } from '/src/common/components/AuthContent';

const Login = () => {
  return <AuthContent form={<LoginForm />} />;
};

export default Login;
