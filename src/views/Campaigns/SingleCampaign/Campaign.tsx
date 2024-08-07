import { IconButton, Typography, Divider, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import React from 'react';

import { useCampaignsContext } from '../CampaignsContext';
import { CampaignTabs } from './CampaignTabs';

import { Colors } from '/src/globalStyles/colors';

export const Campaign = () => {
  const { singleCampaignData } = useCampaignsContext();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', height: '100%', width: '100%' }}>
      <Box sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: Colors.inputBorder + 50,
                color: Colors.simulacrumPrimary,
              },
              transition: 'all 0.3s',
              color: Colors.black,
            }}
            onClick={handleGoBack}
          >
            <ChevronLeftIcon fontSize="large" color="inherit" />
          </IconButton>
          <Box>
            <Typography fontSize={18}>{singleCampaignData.name}</Typography>
            <Typography fontSize={12}>
              Created on - {format(new Date(singleCampaignData.createdAt), 'LLLL dd, yyyy HH:mm')}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: Colors.lightGray,
          width: '100%',
          mt: '16px',
        }}
      />
      <CampaignTabs />
    </Box>
  );
};
