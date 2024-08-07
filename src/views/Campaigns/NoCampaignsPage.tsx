import { Typography, Button, Box } from '@mui/material';
import React from 'react';

import { useCampaignsContext } from './CampaignsContext';

import { CampaignLogo } from '/src/assets';

export const NoCampaignsPage = () => {
  const { setOpenModal } = useCampaignsContext();

  return (
    <>
      <Box
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          width: '100%',
          gap: '16px',
        }}
      >
        <CampaignLogo />
        <Typography fontSize={24}>Create a campaign and close a thousand deals</Typography>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          variant="contained"
          size="small"
        >
          Create Campaign
        </Button>
      </Box>
    </>
  );
};
