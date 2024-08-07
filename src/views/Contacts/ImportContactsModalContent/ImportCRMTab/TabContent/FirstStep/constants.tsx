import React from 'react';

import { SalesforceLogo, TwilioLogo } from '/src/assets';
import { Colors } from '/src/globalStyles/colors';

export type IntegrationType = {
  integrationType: string;
  description: string;
  icon: JSX.Element;
  name: string;
};

export const IntegrationList = [
  {
    description: 'Import contacts from Salesforce',
    integrationType: 'salesforce',
    icon: <SalesforceLogo />,
    name: 'Salesforce',
  },
  {
    description: 'Connect your Twilio account',
    integrationType: 'twilio',
    icon: <TwilioLogo />,
    name: 'Twilio',
  },
];

export const CardStatusStyles = {
  backgroundColor: `${Colors.invalidRed + 20}`,
  color: `${Colors.invalidRed}`,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  padding: '2px 6px',
  cursor: 'pointer',
  fontSize: '12px',
  display: 'flex',
  height: '20px',
  right: '24px',
};

export const CardStyles = {
  border: `1px solid ${Colors.inputBorder}`,
  justifyContent: 'space-between',
  backgroundColor: Colors.white,
  padding: '0 8px 6px 8px',
  flexDirection: 'column',
  position: 'relative',
  alignItems: 'center',
  borderRadius: '8px',
  height: '185px',
  display: 'flex',
  width: '240px',
  gap: '4px',
};

export const CardIconWrapper = {
  '& svg': {
    width: '30px',
  },
  backgroundColor: Colors.white,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  display: 'flex',
  height: '45px',
  width: '45px',
};
