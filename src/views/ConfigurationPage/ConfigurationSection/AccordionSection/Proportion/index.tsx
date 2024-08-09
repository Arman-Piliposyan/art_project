import { Box } from '@mui/material';
import React from 'react';

import { ProportionSection } from './ProportionSection';
import { SignColorSection } from './SignColorSection';

export const Proportion = () => {
  return (
    <Box sx={{ flexDirection: 'column', display: 'flex' }}>
      <SignColorSection />
      <ProportionSection />
    </Box>
  );
};
