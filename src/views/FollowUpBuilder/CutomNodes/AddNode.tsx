import AddIcon from '@mui/icons-material/Add';
import { Handle } from '@xyflow/react';
import { Box } from '@mui/material';
import React from 'react';

import { NODE_HEIGHT, NODE_WIDTH } from '../constants';
import { useFlowContext } from '../FlowContext';
import { NodeDataType } from '../types';

import { Colors } from '/src/globalStyles/colors';

export const AddNode = (nodeData: NodeDataType) => {
  const { setIsBottomSidebarOpen, setSelectedAddNodeData } = useFlowContext();

  const handleOpenBottomSidebar = () => {
    setSelectedAddNodeData(nodeData);
    setIsBottomSidebarOpen(true);
  };

  return (
    <Box
      sx={{
        width: `${nodeData.sourcePosition === 'right' ? NODE_HEIGHT : NODE_WIDTH}px`,
        backgroundColor: 'transparent',
        height: `${NODE_HEIGHT}px`,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Handle
        position={nodeData.targetPosition!}
        style={{ opacity: '0' }}
        isConnectable={false}
        type="target"
      />

      <Box
        sx={{
          '&: hover': {
            backgroundColor: Colors.simulacrumPrimary + 50,
          },
          border: `1px solid ${Colors.simulacrumPrimary + 50}`,
          backgroundColor: Colors.paperBackgroundColor,
          boxShadow: ' 0px 3px 3px 0px #00000030',
          color: Colors.simulacrumPrimary,
          height: `${NODE_HEIGHT}px`,
          width: `${NODE_HEIGHT}px`,
          justifyContent: 'center',
          transition: 'all 0.3s',
          alignItems: 'center',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
        }}
        onClick={handleOpenBottomSidebar}
      >
        <AddIcon sx={{ color: Colors.black, fontSize: '22px' }} />
      </Box>
    </Box>
  );
};
