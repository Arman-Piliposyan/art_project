import { Box } from '@mui/material';
import React from 'react';

import { useImportContactsContext } from '../../ImportContactsContext';
import { SecondStep } from './SecondStep';
import { FirstStep } from './FirstStep';
import { ThirdStep } from './ThirdStep';

export const TabContent = () => {
  const {
    importCSVTabData: { step },
  } = useImportContactsContext();

  const generateTabContent = () => {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: 'calc(100% - 72px)', padding: '16px 0', width: '100%' }}>{generateTabContent()}</Box>
  );
};
