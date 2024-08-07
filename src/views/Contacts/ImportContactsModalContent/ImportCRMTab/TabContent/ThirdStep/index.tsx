import { Box } from '@mui/material';
import React from 'react';

import { FieldsChooseSection } from './FieldsChooseSection';
import { StepHeader } from './StepHeader';

export const ThirdStep = () => {
  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <StepHeader />
      <FieldsChooseSection />
    </Box>
  );
};
