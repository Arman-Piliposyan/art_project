import { Typography, Box } from '@mui/material';
import React from 'react';

import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { Colors } from '/src/globalStyles/colors';

const SectionsStyles = {
  backgroundColor: Colors.paperBackgroundColor,
  borderRadius: '8px',
  paddingY: '24px',
  height: '30%',
  width: '100%',
};

export const LeftSide = () => {
  const { organizationInfo } = useOrganizationContext();

  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: '25%',
        gap: '16px',
      }}
    >
      <Box sx={SectionsStyles}>
        <Box sx={{ borderBottom: `1px solid ${Colors.simulacrumPrimary}`, paddingBottom: '16px' }}>
          <Typography fontWeight={600} align="center">
            AI Model
          </Typography>
        </Box>
        <Box sx={{ paddingTop: '16px' }}>
          <Typography align="center" fontSize={14}>
            Simulacrum AI - 2024-04-20-1m-76B
          </Typography>
        </Box>
      </Box>

      <Box sx={SectionsStyles}>
        <Box sx={{ borderBottom: `1px solid ${Colors.simulacrumPrimary}`, paddingBottom: '16px' }}>
          <Typography fontWeight={600} align="center">
            Channel
          </Typography>
        </Box>
        <Box sx={{ paddingTop: '16px' }}>
          <Typography align="center" fontSize={14}>
            SMS (Twilio) {organizationInfo.Phone}
          </Typography>
        </Box>
      </Box>

      <Box sx={SectionsStyles}>
        <Box sx={{ borderBottom: `1px solid ${Colors.simulacrumPrimary}`, paddingBottom: '16px' }}>
          <Typography fontWeight={600} align="center">
            Segment
          </Typography>
        </Box>
        <Box sx={{ paddingTop: '16px' }}>
          <Typography align="center" fontSize={14}>
            My First Segment List 🚀 20368 Contacts
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
