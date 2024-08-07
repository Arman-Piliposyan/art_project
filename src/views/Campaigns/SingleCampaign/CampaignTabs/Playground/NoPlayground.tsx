import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { Typography, Button, Box } from '@mui/material';
import React, { useState } from 'react';

import { CommonDialog } from '/src/common/components/UI-Components/CommonDialog';

export const NoPlayground = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDialog = () => {
    if (!isOpenDialog) {
      return;
    }
    setIsOpenDialog(false);
  };

  const handleOpenDialog = () => {
    if (isOpenDialog) {
      return;
    }
    setIsOpenDialog(true);
  };

  const handleStartPlayground = () => {
    console.log('start');
  };

  return (
    <>
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          width: '100%',
        }}
      >
        <Button onClick={handleOpenDialog} variant="contained" color="primary" size="large">
          Start Playground
        </Button>
      </Box>
      {isOpenDialog && (
        <CommonDialog
          dialogContent={
            <Typography sx={{ wordWrap: ' break-word' }}>
              Are you sure you want to start the playground?
            </Typography>
          }
          confirmIcon={<PlayCircleFilledWhiteOutlinedIcon />}
          handleCloseDialog={handleCloseDialog}
          confirmAction={handleStartPlayground}
          isOpenDialog={isOpenDialog}
          isLoading={isLoading}
          buttonColor="primary"
          disabled={isLoading}
          confirmText="Yes"
          cancelText="No"
        />
      )}
    </>
  );
};
