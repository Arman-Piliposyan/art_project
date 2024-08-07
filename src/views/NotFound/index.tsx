import { Typography, Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

const pageWrapperStyles = {
  backgroundColor: Colors.rootBackgroundColor,
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  display: 'flex',
  width: '100%',
};

const NotFound = () => {
  return (
    <Box sx={pageWrapperStyles}>
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          opacity: '0.2',
        }}
      >
        <Typography sx={{ fontSize: '120px', height: '135px' }}>404</Typography>
        <Typography sx={{ fontSize: '30px' }}>Page Not Found</Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
