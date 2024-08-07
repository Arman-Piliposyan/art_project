import React from 'react';

import { SalesforceLogo, LinkedinLogo, OpenAiLogo, TwilioLogo, GmailLogo, SmtpIcon } from '/src/assets';
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
  {
    description: 'Connect your OpenAI account',
    integrationType: 'openAi',
    icon: <OpenAiLogo />,
    name: 'OpenAI',
  },
  {
    description: 'Connect your Gmail account',
    integrationType: 'gmail',
    icon: <GmailLogo />,
    name: 'Gmail',
  },
  {
    description: 'Connect your SMTP',
    integrationType: 'smtp',
    icon: <SmtpIcon />,
    name: 'SMTP',
  },
  {
    description: 'Connect your Linkedin',
    integrationType: 'linkedin',
    icon: <LinkedinLogo />,
    name: 'Linkedin',
  },
];

export const CardStatusStyles = {
  '&: hover': {
    color: `${Colors.invalidRed}`,
  },
  color: `${Colors.simulacrumPrimary}`,
  backgroundColor: `${Colors.white}`,
  justifyContent: 'center',
  position: 'absolute',
  alignItems: 'center',
  borderRadius: '4px',
  padding: '2px 6px',
  cursor: 'pointer',
  fontSize: '12px',
  display: 'flex',
  height: '20px',
  right: '24px',
  top: '24px',
  gap: '4px',
};

export const CardStyles = {
  backgroundColor: Colors.simulacrumPrimary,
  justifyContent: 'space-between',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: '8px',
  padding: '8px 16px',
  height: '178px',
  display: 'flex',
  width: '326px',
  gap: '4px',
};

export const CrdIconWrapper = {
  '& svg': {
    height: 'max-content',
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
