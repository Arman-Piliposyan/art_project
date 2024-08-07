import { Box } from '@mui/material';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        height: 'calc(100% - 49px)',
        width: '100%',
      }}
      aria-labelledby={`simple-tab-${index}`}
      id={`simple-tabpanel-${index}`}
      hidden={value !== index}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box sx={{ height: '100%', width: '100%' }}>{children}</Box>}
    </Box>
  );
};
