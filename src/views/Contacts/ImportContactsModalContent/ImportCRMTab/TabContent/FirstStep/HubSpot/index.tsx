import { FormControlLabel, Button, Radio, Box } from '@mui/material';
import React from 'react';

import { CardStyles } from '../constants';

import { AlternativeButtonWithBorderStyles } from '/src/constants';
import { HubSpotLogo } from '/src/assets';

export const HubSpotIntegrationCard = () => {
  return (
    <Box sx={{ ...CardStyles }}>
      <Box sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%' }}>
        <FormControlLabel control={<Radio />} value="hubSpot" disabled={true} label="" />
      </Box>
      <HubSpotLogo />

      <Box sx={{ height: '32px', width: '100%' }}>
        <Button
          sx={AlternativeButtonWithBorderStyles}
          variant="contained"
          disabled={true}
          color="primary"
          size="small"
        >
          Coming Soon
        </Button>
      </Box>
    </Box>
  );
};
