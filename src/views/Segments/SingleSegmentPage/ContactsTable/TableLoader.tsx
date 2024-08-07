import { CircularProgress, Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

export const TableLoader = () => {
  const loadingContainerStyles = {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    display: 'flex',
    height: '100%',
    opacity: '0.7',
    width: '100%',
    zIndex: '2',
  };
  return (
    <Box sx={loadingContainerStyles}>
      <CircularProgress sx={{ color: Colors.simulacrumPrimary }} size={30} />
    </Box>
  );
};
