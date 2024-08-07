import { Typography, Box } from '@mui/material';
import React from 'react';

export const NoConversationSelect = () => {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          width: '40%',
          gap: '6px',
        }}
      >
        <Typography sx={{ marginTop: '8px' }} align="center" fontSize={18}>
          Select Conversation
        </Typography>
      </Box>
    </Box>
  );
};
