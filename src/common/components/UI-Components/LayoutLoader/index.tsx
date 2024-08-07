import { CircularProgress, Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

export const LayoutLoader = ({ backgroundColor, height }: { backgroundColor?: string; height?: string }) => {
  const loadingContainerStyles = {
    height: `calc(100vh - ${height ? height : '90px'})`,
    backgroundColor: backgroundColor || Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  };
  return (
    <Box sx={loadingContainerStyles}>
      <CircularProgress sx={{ color: Colors.colorPrimary }} size={30} />
    </Box>
  );
};
