import { Box } from '@mui/material';
import React from 'react';

import { useImportContactsContext } from '../../ImportContactsContext';
import { SecondStep } from './SecondStep';
import { FourthStep } from './FourthStep';
import { FirstStep } from './FirstStep';
import { ThirdStep } from './ThirdStep';

export const TabContent = () => {
  const {
    importCRMTabData: { step },
  } = useImportContactsContext();

  const generateTabContent = () => {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FourthStep />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: 'calc(100% - 72px)', padding: '16px 0', width: '100%' }}>{generateTabContent()}</Box>
  );
};
