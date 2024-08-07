import { Box } from '@mui/material';
import React from 'react';

import { ConfigurationSection } from './ConfigurationSection';
import { PreviewSection } from './PreviewSection';

const ConfigurationPage = () => {
  return (
    <Box sx={{ backgroundColor: 'white', height: '100vh', display: 'flex', width: '100%' }}>
      <PreviewSection />
      <ConfigurationSection />
    </Box>
  );
};

export default ConfigurationPage;
