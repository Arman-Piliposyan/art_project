import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Typography, Box } from '@mui/material';
import { Handle } from '@xyflow/react';
import React from 'react';

import { NODE_HEIGHT, NODE_WIDTH } from '../constants';
import { NodeDataType } from '../types';

import { Colors } from '/src/globalStyles/colors';

export const StartNode = (nodeData: NodeDataType) => {
  return (
    <Box
      sx={{
        border: `1px solid ${Colors.lightGray}`,
        boxShadow: ' 0px 3px 3px 0px #00000030',
        height: `${NODE_HEIGHT}px`,
        backgroundColor: 'white',
        width: `${NODE_WIDTH}px`,
        transition: 'all 0.3s',
        alignItems: 'center',
        borderRadius: '6px',
        display: 'flex',
        p: '8px',
      }}
    >
      <Box
        sx={{
          backgroundColor: Colors.simulacrumPrimary + 20,
          color: Colors.simulacrumPrimary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          display: 'flex',
          height: '40px',
          width: '40px',
        }}
      >
        <PlayCircleFilledIcon />
      </Box>
      <Typography sx={{ width: 'calc(100% - 80px)', px: '8px' }} align="center">
        {nodeData.data.label}
      </Typography>
      <Handle
        position={nodeData.sourcePosition!}
        style={{ opacity: '0' }}
        isConnectable={false}
        type="source"
      />
    </Box>
  );
};
