import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = { label: string };

export const MessageTabLabel = ({ label }: Props) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {label}
      <Box
        sx={{
          background: `linear-gradient(180deg, #00EFD1 0%, ${Colors.simulacrumPrimary} 100%)`,
          padding: '2px 4px 0px 4px',
          position: 'absolute',
          borderRadius: '8px',
          display: 'flex',
          fontSize: '8px',
          color: 'white',
          right: '-28px',
          top: '-8px',
        }}
      >
        AI <AutoAwesomeOutlinedIcon fontSize="inherit" />
      </Box>
    </Box>
  );
};
