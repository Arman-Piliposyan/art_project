import { Typography, IconButton, MenuItem, Menu, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useState } from 'react';
import { Handle } from '@xyflow/react';

import { NODE_HEIGHT, NODE_WIDTH } from '../constants';
import { deleteNodeAndChildren } from '../helpers';
import { useFlowContext } from '../FlowContext';
import { NodeDataType } from '../types';

import { Colors } from '/src/globalStyles/colors';

export const ConditionNode = (nodeData: NodeDataType) => {
  const { setSelectedConditionData, setIsBottomSidebarOpen, setReRender, setNodes, setEdges, nodes, edges } =
    useFlowContext();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isChildHovered, setIsChildHovered] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleChildMouseEnter = () => {
    setIsChildHovered(true);
  };

  const handleChildMouseLeave = () => {
    setIsChildHovered(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleDeleteNode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newData = deleteNodeAndChildren(nodeData.id, nodes, edges);
    setNodes(newData.updatedNodesArray);
    setEdges(newData.updatedEdgesArray);
    setReRender(true);
  };

  const handleEditCondition = () => {
    setSelectedConditionData(nodeData);
    setIsBottomSidebarOpen(true);
  };

  return (
    <Box
      sx={{
        '&: hover': {
          backgroundColor: isChildHovered ? '' : Colors.paperBackgroundColor,
        },
        boxShadow: ' 0px 3px 3px 0px #00000030',
        border: `1px solid ${Colors.lightGray}`,
        height: `${NODE_HEIGHT}px`,
        backgroundColor: 'white',
        width: `${NODE_WIDTH}px`,
        transition: 'all 0.3s',
        alignItems: 'center',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        p: '8px',
      }}
      onClick={handleEditCondition}
    >
      <Box
        sx={{
          backgroundColor: Colors.simulacrumPrimary + 20,
          color: Colors.simulacrumPrimary,
          justifyContent: 'center',
          transition: 'all 0.3s',
          alignItems: 'center',
          borderRadius: '50%',
          display: 'flex',
          height: '40px',
          width: '40px',
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {nodeData.data.icon}
      </Box>
      <Typography sx={{ width: 'calc(100% - 80px)' }} align="center">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {nodeData.data.label}
      </Typography>
      <Box>
        <IconButton
          sx={{
            '&:hover': {
              backgroundColor: Colors.inputBorder + 50,
              color: Colors.simulacrumPrimary,
            },
            transition: 'all 0.3s',
          }}
          onMouseEnter={handleChildMouseEnter}
          onMouseLeave={handleChildMouseLeave}
          onClick={handleClick}
          size="small"
        >
          <MoreHorizIcon sx={{ height: '24px', width: '24px' }} />
        </IconButton>
        <Menu
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          onClose={handleClose}
          anchorEl={anchorEl}
          id="basic-menu"
          open={open}
        >
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <MenuItem onClick={handleDeleteNode}>Delete</MenuItem>
        </Menu>
      </Box>
      <Handle
        position={nodeData.sourcePosition!}
        style={{ opacity: '0' }}
        isConnectable={true}
        type="source"
      />
      <Handle
        position={nodeData.targetPosition!}
        style={{ opacity: '0' }}
        isConnectable={true}
        type="target"
      />
    </Box>
  );
};
