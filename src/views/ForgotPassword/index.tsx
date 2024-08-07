import React, { useState } from 'react';

import { ForgotPasswordSuccessForm } from './ForgotPasswordSuccessForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

import { AuthContent } from '/src/common/components/AuthContent';

const ForgotPassword = () => {
  const [showForgotPasswordSecondStep, setShowForgotPasswordSecondStep] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <>
      <AuthContent
        form={
          showForgotPasswordSecondStep ? (
            <ForgotPasswordSuccessForm email={email} />
          ) : (
            <ForgotPasswordForm setShowSecondPage={setShowForgotPasswordSecondStep} setEmail={setEmail} />
          )
        }
      />
    </>
  );
};

export default ForgotPassword;
