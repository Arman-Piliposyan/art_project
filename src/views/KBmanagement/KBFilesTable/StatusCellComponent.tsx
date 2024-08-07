import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import CachedIcon from '@mui/icons-material/Cached';
import BlockIcon from '@mui/icons-material/Block';
import { Box } from '@mui/material';
import React from 'react';

import { StatusType } from '../types';

import { Colors } from '/src/globalStyles/colors';

type Props = { value: StatusType };

export const StatusCellComponent = ({ value }: Props) => {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {value}
      {value === 'Completed' ? (
        <CheckCircleOutlineIcon
          sx={{
            color: Colors.successGreen,
            marginLeft: '10px',
            fontSize: '18px',
          }}
        />
      ) : value === 'Failed' ? (
        <BlockIcon
          sx={{
            color: Colors.invalidRed,
            marginLeft: '10px',
            fontSize: '18px',
          }}
        />
      ) : value === 'Processing' ? (
        <CachedIcon
          sx={{
            color: Colors.simulacrumPrimary,
            marginLeft: '10px',
            fontSize: '18px',
          }}
        />
      ) : value === 'Pending' ? (
        <CloudSyncIcon
          sx={{
            color: Colors.simulacrumPrimary,
            marginLeft: '10px',
            fontSize: '18px',
          }}
        />
      ) : null}
    </Box>
  );
};
