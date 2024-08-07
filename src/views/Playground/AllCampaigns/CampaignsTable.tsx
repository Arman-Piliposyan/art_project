import { Typography, Divider, Box } from '@mui/material';
import React from 'react';

// import { useCampaignsContext } from '../CampaignsContext';
import { CampaignRow } from './CampaignRow';
import { CampaignDataType } from '../types';

import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  allCampaignData: CampaignDataType[];
};

export const CampaignsTable = ({ allCampaignData }: Props) => {
  return (
    <Box sx={{ border: `1px solid ${Colors.lightGray}`, borderRadius: '6px', height: '100%', p: '4px' }}>
      <Box
        sx={{
          backgroundColor: Colors.paperBackgroundColor,
          paddingRight: '12px',
          display: 'flex',
          width: '100%',
          pt: '16px',
          mb: '4px',
        }}
      >
        <Box sx={{ width: '50%', pl: '16px' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Campaign Name
          </Typography>
        </Box>

        <Box sx={{ width: '25%' }}>
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
      <Box
        sx={{
          ...ScrollBarStylesGenerator('calc(100% - 68px)'),
          paddingRight: '12px',
          mt: '8px',
        }}
      >
        {allCampaignData.map((campaign: CampaignDataType) => {
          return <CampaignRow campaign={campaign} key={campaign.id} />;
        })}
      </Box>
    </Box>
  );
};
