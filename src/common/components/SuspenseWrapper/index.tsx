import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { CircularProgress, Box } from '@mui/material';
import React, { Suspense } from 'react';

import { Colors } from '/src/globalStyles/colors';

interface SuspenseWrapperProps {
  checkSubscription?: boolean;
  wrapperForLayout?: boolean;
  children: ReactJSXElement;
}

const SuspenseWrapper = ({ wrapperForLayout = false, children }: SuspenseWrapperProps) => {
  const wrapperStyles = {
    height: wrapperForLayout ? 'calc(100vh - 80px)' : '100vh',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  };

  return (
    <Suspense
      fallback={
        <Box sx={wrapperStyles}>
          <CircularProgress sx={{ color: Colors.colorPrimary }} size={30} />
        </Box>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
