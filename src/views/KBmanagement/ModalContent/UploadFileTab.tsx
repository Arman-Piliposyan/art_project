import { Typography, Box } from '@mui/material';
import React from 'react';

import { InputTypeFile } from '../InputTypeFile';

import { Colors } from '/src/globalStyles/colors';

export const UploadFileTab = () => {
  return (
    <Box sx={{ padding: '16px 0' }}>
      <Typography color={Colors.placeholderColor} sx={{ marginBottom: '4px' }} fontSize={12}>
        Upload File
      </Typography>
      <InputTypeFile />
    </Box>
  );
};
