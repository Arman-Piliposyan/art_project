import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { CircularProgress, Box } from '@mui/material';
import React, { Suspense } from 'react';

import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { Colors } from '/src/globalStyles/colors';
import NotFound from '/src/views/NotFound';

interface SuspenseWrapperProps {
  checkSubscription?: boolean;
  wrapperForLayout?: boolean;
  children: ReactJSXElement;
}

const SuspenseWrapper = ({
  checkSubscription = false,
  wrapperForLayout = false,
  children,
}: SuspenseWrapperProps) => {
  const wrapperStyles = {
    height: wrapperForLayout ? 'calc(100vh - 80px)' : '100vh',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  };
  const { organizationInfo } = useOrganizationContext();

  const hasPermission =
    organizationInfo && checkSubscription && organizationInfo.subscriptionPlan === 'standard' ? false : true;

  return (
    <Suspense
      fallback={
        <Box sx={wrapperStyles}>
          <CircularProgress sx={{ color: Colors.simulacrumPrimary }} size={30} />
        </Box>
      }
    >
      {hasPermission ? children : <NotFound />}
    </Suspense>
  );
};

export default SuspenseWrapper;
