import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import { CampaignLogo } from '/src/assets';

export const NoCampaignsPage = () => {
  const navigate = useNavigate();

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
        <Typography fontSize={24}>Start testing your campaigns for better results</Typography>
        <Button
          onClick={() => {
            navigate('/campaigns');
          }}
          variant="contained"
          size="small"
        >
          Go to Campaigns
        </Button>
      </Box>
    </>
  );
};
