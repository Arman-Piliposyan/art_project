import {
  BackgroundVariant,
  useReactFlow,
  Background,
  ReactFlow,
  Controls,
  MiniMap,
  Panel,
} from '@xyflow/react';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Button, Box } from '@mui/material';
import '@xyflow/react/dist/style.css';

import { ZOOM_OUT_LVL, initialNodes, initialEdges, NODE_WIDTH } from './constants';
import { AddNodeSidebarContent } from './AddNodeSidebarContent';
import { getLayoutedElements, elkOptions } from './helpers';
import { ConditionNode } from './CutomNodes/ConditionNode';
import { ActionNode } from './CutomNodes/ActionNode';
import { StartNode } from './CutomNodes/StartNode';
import { AddNode } from './CutomNodes/AddNode';
import { useFlowContext } from './FlowContext';

import { CustomSideBar } from '/src/common/components/CustomSideBar';
import { SideBar } from '/src/common/components/SideBar';
import { Colors } from '/src/globalStyles/colors';

export const Flow = () => {
  const [layoutDirection, setLayoutDirection] = useState('DOWN');
  const { setViewport, setCenter } = useReactFlow();
  const wrapperRef = useRef(null);

  const {
    setIsBottomSidebarOpen,
    setSelectedAddNodeData,
    isBottomSidebarOpen,
    selectedAddNodeData,
    setIsSidebarOpen,
    isSidebarOpen,
    onNodesChange,
    onEdgesChange,
    setReRender,
    setNodes,
    setEdges,
    reRender,
    nodes,
    edges,
  } = useFlowContext();

  const nodeTypes = {
    conditionNode: ConditionNode,
    actionNode: ActionNode,
    startNode: StartNode,
    addNode: AddNode,
  };

  useEffect(() => {
    if (!wrapperRef?.current) {
      return;
    }
    setViewport({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      x: (wrapperRef?.current?.clientWidth - NODE_WIDTH / ZOOM_OUT_LVL) / 2,
      zoom: 1 / ZOOM_OUT_LVL,
      y: 5,
    });
    setCenter(NODE_WIDTH / 2, 330, { duration: 1500, zoom: 1 });
  }, []);

  const onLayout = useCallback(
    ({ useInitialNodes = false, direction }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      });
    },
    [nodes, edges],
  );

  useEffect(() => {
    if (!reRender) {
      return;
    }
    onLayout({ direction: layoutDirection, useInitialNodes: false });
    if (selectedAddNodeData) {
      setCenter(selectedAddNodeData.positionAbsoluteX + 300, selectedAddNodeData.positionAbsoluteY + 200, {
        duration: 1500,
        zoom: 1,
      });
    }
    setSelectedAddNodeData(null);
    setReRender(false);
  }, [reRender]);

  return (
    <Box style={{ height: '100%', width: '100%' }} ref={wrapperRef}>
      <ReactFlow
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
      >
        <Background variant={BackgroundVariant.Dots} color="#ccc" />
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === 'addNode') return '';
            return Colors.simulacrumPrimary;
            if (n.type === 'selectorNode') return Colors.simulacrumPrimary;
            if (n.type === 'output') return '#ff0072';
          }}
          nodeColor={(n) => {
            if (n.type === 'addNode') return 'transparent';
            return Colors.simulacrumPrimary;
            if (n.type === 'selectorNode') return Colors.simulacrumPrimary;
          }}
          style={{ margin: '4px' }}
          nodeStrokeWidth={3}
          zoomStep={1}
          pannable
          zoomable
        />
        <Panel style={{ margin: '4px' }} position="top-right">
          <Button
            onClick={() => {
              onLayout({ direction: 'DOWN' });
              setLayoutDirection('DOWN');
            }}
            sx={{ fontSize: '10px', width: '95px', mr: '4px' }}
            variant="contained"
            size="small"
          >
            vertical
          </Button>
          <Button
            onClick={() => {
              setLayoutDirection('RIGHT');
              onLayout({ direction: 'RIGHT' });
            }}
            sx={{ fontSize: '10px', width: '95px' }}
            variant="contained"
            size="small"
          >
            horizontal
          </Button>
        </Panel>
        <Controls
          style={{
            margin: '4px',
          }}
        />
      </ReactFlow>
      <CustomSideBar
        toggleDrawer={() => {
          setIsBottomSidebarOpen(!isBottomSidebarOpen);
        }}
        isOpen={isBottomSidebarOpen}
        sideBarPosition="bottom"
        height={500}
        width={1200}
      >
        {<AddNodeSidebarContent />}
      </CustomSideBar>
      <SideBar
        toggleDrawer={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
        isOpen={isSidebarOpen}
      >
        <div>ALO</div>
      </SideBar>
    </Box>
  );
};
