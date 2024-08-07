import { Typography, Snackbar, Divider, Button, Alert, Box } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React, { useState } from 'react';

import { useSegmentsContext } from '../SegmentsContext';
import { SegmentsTable } from './SegmentsTable';

import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { Colors } from '/src/globalStyles/colors';

export const AllSegmentsPage = () => {
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
      <Box
        sx={{ justifyContent: 'space-between', paddingBottom: '16px', alignItems: 'center', display: 'flex' }}
      >
        <Typography fontSize={22}>Segments</Typography>
        <Button
          onClick={handleOpenCreationPage}
          endIcon={<AddOutlinedIcon />}
          sx={{ height: '42px' }}
          variant="contained"
          color="primary"
          size="small"
        >
          Create a New Segment
        </Button>
      </Box>
      <Divider
        sx={{
          borderColor: `${Colors.inputBorder}`,
          width: '100%',
          mb: '50px',
        }}
      />
      <Box
        sx={{
          height: 'calc(100% - 130px)',
          flexDirection: 'column',
          display: 'flex',
          width: '100%',
          gap: '32px',
        }}
      >
        <SegmentsTable />
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
