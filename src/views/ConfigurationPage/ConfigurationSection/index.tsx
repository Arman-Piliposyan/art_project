import { Box } from '@mui/material';
import React from 'react';

import { AccordionSection } from './AccordionSection';
import { InfoSection } from './InfoSection';

import { Colors } from '/src/globalStyles/colors';

export const ConfigurationSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: Colors.paperBackgroundColor,
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: '30%',
        p: '16px',
      }}
    >
      <InfoSection />
      <AccordionSection />
    </Box>
  );
};
