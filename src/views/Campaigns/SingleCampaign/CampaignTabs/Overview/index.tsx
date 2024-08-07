import React, { useState } from 'react';
import { Box } from '@mui/material';

import { RightSide } from './RightSide';
import { LeftSide } from './LeftSide';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';

export const Overview = () => {
  const [isTabLoading, setIsTabLoading] = useState(false);

  return (
    <>
      {isTabLoading ? (
        <LayoutLoader height="250px" />
      ) : (
        <Box sx={{ display: 'flex', height: '420px', gap: '16px' }}>
          <LeftSide />
          <RightSide />
        </Box>
      )}
    </>
  );
};
