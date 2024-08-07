import { Typography, Snackbar, Button, Alert, Box } from '@mui/material';
import React, { useState } from 'react';

import { useSegmentsContext } from './SegmentsContext';

import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { SegmentsLogo } from '/src/assets';

export const NoSegmentsPage = () => {
  const { setIsSegmentCreationPageOpen } = useSegmentsContext();
  const {
    organizationInfo: { contactsCount },
  } = useOrganizationContext();

  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleOpenCreationPage = () => {
    if (!contactsCount) {
      handleOpenAlert();
      return;
    }
    setIsSegmentCreationPageOpen(true);
  };

  return (
    <>
      <Typography sx={{ marginBottom: '16px' }} fontWeight={500} fontSize={22}>
        Segments
      </Typography>
      <Box
        sx={{
          height: 'calc(100% - 49px)',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          gap: '16px',
        }}
      >
        <SegmentsLogo />
        <Typography fontSize={24}>Create segments to organize contacts efficiently</Typography>
        <Button onClick={handleOpenCreationPage} variant="contained" size="small">
          Create Segment
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={handleCloseAlert}
        autoHideDuration={10000}
        sx={{ width: '80%' }}
        open={openAlert}
      >
        <Alert onClose={handleCloseAlert} severity="warning">
          You can't create a segment because you don't have any contacts. Please import your contacts first,
          and then create the segment.
        </Alert>
      </Snackbar>
    </>
  );
};
