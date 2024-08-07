import { MarkerType, Position } from '@xyflow/react';
import { Typography, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

import { useFlowContext } from '../../FlowContext';
import { NodeDataType } from '../../types';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  condition: {
    icon: JSX.Element;
    title: string;
    key: string;
  };
};

export const Action = ({ condition }: Props) => {
  const {
    setIsBottomSidebarOpen,
    selectedAddNodeData,
    setIsSidebarOpen,
    setReRender,
    setNodes,
    setEdges,
    nodes,
    edges,
  } = useFlowContext();

  const handleAddActionNode = () => {
    setIsSidebarOpen(true);
    setIsBottomSidebarOpen(false);
    const findAddNodeIndex = nodes.findIndex((node: NodeDataType) => node.id === selectedAddNodeData.id);
    const addNodeId = uuidv4();

    setNodes([
      ...nodes.slice(0, findAddNodeIndex),
      {
        ...nodes[findAddNodeIndex],
        data: { label: condition.title, icon: condition.icon },
        type: 'actionNode',
      },
      {
        position: {
          y: 0,
          x: 0,
        },
        sourcePosition: Position.Bottom,
        type: 'addNode',
        id: addNodeId,
        data: {},
      },
      ...nodes.slice(findAddNodeIndex + 1),
    ]);
    setEdges([
      ...edges,
      {
        markerEnd: {
          color: Colors.simulacrumPrimary,
          type: MarkerType.ArrowClosed,
          height: 16,
          width: 16,
        },
        style: {
          stroke: Colors.simulacrumPrimary,
          strokeWidth: 2,
        },
        source: nodes[findAddNodeIndex].id,
        id: `e1-${addNodeId}`,
        type: 'smoothstep',
        target: addNodeId,
        animated: true,
      },
    ]);
    setReRender(true);
  };

  return (
    <Box
      sx={{
        '&: hover': {
          backgroundColor: Colors.paperBackgroundColor + 70,
          border: `1px solid ${Colors.simulacrumPrimary}`,
        },
        border: `1px solid ${Colors.lightGray}`,
        transition: 'all 0.3s',
        alignItems: 'center',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        height: '56px',
        width: '260px',
        gap: '16px',
        p: '8px',
      }}
      onClick={handleAddActionNode}
    >
      <Box
        sx={{
          backgroundColor: Colors.successGreen + 50,
          color: Colors.simulacrumPrimary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          display: 'flex',
          height: '40px',
          width: '40px',
        }}
      >
        {condition.icon}
      </Box>
      <Typography fontSize={14}>{condition.title}</Typography>
    </Box>
  );
};
