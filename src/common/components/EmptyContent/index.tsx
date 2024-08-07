import { Typography, Box } from '@mui/material';
import React from 'react';

const containerStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  height: '90%',
};

type Props = { fontSize?: string; text: string };

export const EmptyContent = ({ fontSize = '40px', text }: Props) => {
  return (
    <Box style={containerStyles}>
      <Typography
        sx={{
          fontSize: fontSize,
          height: '135px',
          opacity: '0.2',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
