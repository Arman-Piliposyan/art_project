import { Box } from '@mui/material';
import React from 'react';

import { UploadFileSection } from './UploadFileSection';
import { InputTypeFile } from './InputTypeFile';

export const FirstStep = () => {
  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', height: '100%', width: '100%' }}>
      <InputTypeFile key={Math.random()} />
      <UploadFileSection />
    </Box>
  );
};
