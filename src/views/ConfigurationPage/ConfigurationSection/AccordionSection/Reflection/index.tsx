import { Box } from '@mui/material';
import React from 'react';

import { ReflectionColorSection } from './ReflectionColorSection';
import { ReflectionSection } from './ReflectionSection';
import { SizeSection } from './SizeSection';

export const Reflection = () => {
  return (
    <Box sx={{ flexDirection: 'column', display: 'flex' }}>
      <ReflectionSection />
      <ReflectionColorSection />
      <SizeSection />
    </Box>
  );
};
