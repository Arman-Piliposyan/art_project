import { Typography, Divider, Box } from '@mui/material';
import React from 'react';

import { useCampaignsContext } from '../CampaignsContext';
import { CampaignDataType } from '../types';
import { CampaignRow } from './CampaignRow';

import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export const CampaignsTable = () => {
  const { allCampaignData } = useCampaignsContext();

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ paddingRight: '12px', display: 'flex', width: '100%' }}>
        <Box sx={{ width: '5%', pl: '8px' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Active
          </Typography>
        </Box>
        <Box sx={{ width: '20%', pl: '16px' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Campaign Name
          </Typography>
        </Box>
        <Box sx={{ width: '20%' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Campaign Type
          </Typography>
        </Box>
        <Box sx={{ width: '15%' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Leads Completed
          </Typography>
        </Box>
        <Box sx={{ width: '15%' }}>
          <Typography sx={{ marginBottom: '16px', paddingLeft: '16px' }} fontWeight={700}>
            Sender
          </Typography>
        </Box>
        <Box sx={{ width: '15%' }}>
          <Typography sx={{ marginBottom: '16px', paddingLeft: '12px' }} fontWeight={700}>
            Status
          </Typography>
        </Box>
        <Box sx={{ width: '10%', pl: '8px' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Actions
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: `${Colors.inputBorder}`,
          width: '100%',
        }}
      />
      <Box sx={{ ...ScrollBarStylesGenerator('calc(100% - 22px)'), paddingRight: '12px', mt: '8px' }}>
        {allCampaignData.map((campaign: CampaignDataType) => {
          return <CampaignRow campaign={campaign} key={campaign.id} />;
        })}
      </Box>
    </Box>
  );
};
