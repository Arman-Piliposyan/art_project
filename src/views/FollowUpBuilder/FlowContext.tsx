import React, { createContext, useContext, useState } from 'react';
import { useEdgesState, useNodesState } from '@xyflow/react';

import { initialEdges, initialNodes } from './constants';
import { NodeDataType } from './types';

type FlowContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};
const FlowContext = createContext({} as FlowContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const FlowContextProvider = ({ children }: Props): JSX.Element => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedAddNodeData, setSelectedAddNodeData] = useState<NodeDataType | null>(null);
  const [selectedConditionData, setSelectedConditionData] = useState<NodeDataType | null>(null);
  const [isBottomSidebarOpen, setIsBottomSidebarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reRender, setReRender] = useState(false);

  const contextData = {
    setSelectedConditionData,
    setIsBottomSidebarOpen,
    setSelectedAddNodeData,
    selectedConditionData,
    isBottomSidebarOpen,
    selectedAddNodeData,
    setIsSidebarOpen,
    onEdgesChange,
    onNodesChange,
    isSidebarOpen,
    setReRender,
    reRender,
    setNodes,
    setEdges,
    nodes,
    edges,
  };

  return <FlowContext.Provider value={contextData}>{children}</FlowContext.Provider>;
};

export const useFlowContext = () => {
  const contextData = useContext(FlowContext);
  return contextData;
};
