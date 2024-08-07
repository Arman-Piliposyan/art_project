import React, { useState } from 'react';

import { ResetPasswordSuccessForm } from './ResetPasswordSuccessForm';
import { ResetPasswordForm } from './ResetPasswordForm';

import { AuthContent } from '/src/common/components/AuthContent';

const ResetPassword = () => {
  const [showForgotPasswordSecondStep, setShowResetPasswordSecondStep] = useState(false);
  return (
    <>
      <AuthContent
        form={
          showForgotPasswordSecondStep ? (
            <ResetPasswordSuccessForm />
          ) : (
            <ResetPasswordForm setShowSecondPage={setShowResetPasswordSecondStep} />
          )
        }
      />
    </>
  );
};
export default ResetPassword;
