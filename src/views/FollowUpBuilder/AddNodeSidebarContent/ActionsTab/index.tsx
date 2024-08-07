import { Typography, Box } from '@mui/material';
import React from 'react';

import { Actions } from '../../constants';
import { Action } from './Action';

export const ActionsTab = () => {
  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', height: '100%', width: '100%', gap: '16px' }}>
      <Typography fontWeight={600} align="center">
        Add Actions
      </Typography>
      <Typography fontWeight={500} fontSize={14}>
        Actions
      </Typography>
      <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: '16px' }}>
        {Actions.map((action) => {
          return <Action condition={action} key={action.key} />;
        })}
      </Box>
    </Box>
  );
};
