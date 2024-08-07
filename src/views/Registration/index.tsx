import React, { useState } from 'react';

import { RegistrationSuccessPage } from './RegistrationSuccessPage';
import { RegistrationPage } from './RegistrationPage';

import { AuthContent } from '/src/common/components/AuthContent';

const Registration = (): JSX.Element => {
  const [showRegistrationSuccessPage, setShowRegistrationSuccessPage] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState('');

  return (
    <>
      <AuthContent
        form={
          showRegistrationSuccessPage ? (
            <RegistrationSuccessPage registrationEmail={registrationEmail} />
          ) : (
            <RegistrationPage
              setShowRegistrationSuccessPage={setShowRegistrationSuccessPage}
              setRegistrationEmail={setRegistrationEmail}
            />
          )
        }
      />
    </>
  );
};
export default Registration;
