import { Typography, Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

export const StepHeader = () => {
  return (
    <Box
      sx={{
        border: `1px solid ${Colors.placeholderColor}`,
        borderRadius: '6px',
        marginTop: '12px',
        display: 'flex',
        padding: '14px',
        width: '100%',
      }}
    >
      <Typography sx={{ width: '23%' }} fontWeight={600} fontSize={12}>
        Column name
      </Typography>
      <Typography sx={{ width: '33%' }} fontWeight={600} fontSize={12}>
        Variable Simulacrum type
      </Typography>
      <Typography sx={{ width: '43%' }} fontWeight={600} fontSize={12}>
        Samples
      </Typography>
    </Box>
  );
};
