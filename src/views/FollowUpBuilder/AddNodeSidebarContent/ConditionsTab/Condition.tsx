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
    group: string;
    key: string;
  };
};

export const Condition = ({ condition }: Props) => {
  const {
    setSelectedConditionData,
    setIsBottomSidebarOpen,
    selectedConditionData,
    selectedAddNodeData,
    setReRender,
    setNodes,
    setEdges,
    nodes,
    edges,
  } = useFlowContext();

  const handleAddConditionNode = () => {
    const findAddNodeIndex = nodes.findIndex((node: NodeDataType) => {
      return node.id === selectedAddNodeData.id;
    });
    const yesConditionNodeId = uuidv4();
    const noConditionNodeId = uuidv4();

    setNodes([
      ...nodes.slice(0, findAddNodeIndex),
      {
        ...nodes[findAddNodeIndex],
        data: { label: condition.title, icon: condition.icon, key: condition.key },
        position: {
          x: 0,
          y: 0,
        },
        type: 'conditionNode',
      },
      {
        position: {
          x: 0,
          y: 0,
        },
        sourcePosition: Position.Bottom,
        id: yesConditionNodeId,
        type: 'addNode',
        data: {},
      },
      {
        position: {
          x: 0,
          y: 0,
        },
        sourcePosition: Position.Bottom,
        id: noConditionNodeId,
        type: 'addNode',
        data: {},
      },
      ...nodes.slice(findAddNodeIndex + 1),
    ]);
    setEdges([
      ...edges,
      {
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: Colors.successGreen,
          height: 16,
          width: 16,
        },
        style: {
          stroke: Colors.successGreen,
          strokeWidth: 2,
        },
        source: nodes[findAddNodeIndex].id,
        id: `e1-${yesConditionNodeId}`,
        target: yesConditionNodeId,
        type: 'smoothstep',
        animated: true,
        label: 'Yes',
      },
      {
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: Colors.invalidRed,
          height: 16,
          width: 16,
        },
        style: {
          stroke: Colors.invalidRed,
          strokeWidth: 2,
        },
        source: nodes[findAddNodeIndex].id,
        id: `e1-${noConditionNodeId}`,
        target: noConditionNodeId,
        type: 'smoothstep',
        animated: true,
        label: 'No',
      },
    ]);
    setIsBottomSidebarOpen(false);
    setReRender(true);
  };

  const handleUpdateConditionNode = () => {
    if (selectedConditionData?.data.key === condition.key) {
      return;
    }
    const findAddNodeIndex = nodes.findIndex((node: NodeDataType) => {
      return node.id === selectedConditionData.id;
    });
    setNodes([
      ...nodes.slice(0, findAddNodeIndex),
      {
        ...nodes[findAddNodeIndex],
        data: { label: condition.title, icon: condition.icon, key: condition.key },
      },
      ...nodes.slice(findAddNodeIndex + 1),
    ]);
    setSelectedConditionData(null);
    setIsBottomSidebarOpen(false);
    setReRender(true);
  };

  return (
    <Box
      sx={{
        '&: hover': {
          backgroundColor: Colors.paperBackgroundColor + 70,
          border: `1px solid ${Colors.simulacrumPrimary}`,
        },
        border: `1px solid ${
          selectedConditionData?.data.key === condition.key ? Colors.simulacrumPrimary : Colors.lightGray
        }`,
        backgroundColor:
          selectedConditionData?.data.key === condition.key ? Colors.paperBackgroundColor + 70 : 'white',
        cursor: selectedConditionData?.data.key === condition.key ? '' : 'pointer',
        transition: 'all 0.3s',
        alignItems: 'center',
        borderRadius: '6px',
        display: 'flex',
        height: '56px',
        width: '260px',
        gap: '16px',
        p: '8px',
      }}
      onClick={!selectedConditionData ? handleAddConditionNode : handleUpdateConditionNode}
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
        {condition.icon}
      </Box>
      <Typography fontSize={14}>{condition.title}</Typography>
    </Box>
  );
};
