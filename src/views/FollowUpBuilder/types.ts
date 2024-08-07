import { MarkerType, Position } from '@xyflow/react';

export type NodeDataType = {
  data: {
    icon?: JSX.Element;
    label?: string;
  };
  position: {
    x: number;
    y: number;
  };
  sourcePosition?: Position;
  targetPosition?: Position;
  isConnectable: boolean;
  type: string;
  id: string;
};

export type EdgeType = {
  markerEnd: {
    type: MarkerType;
    height: number;
    color: string;
    width: number;
  };
  style: {
    strokeWidth: number;
    stroke: string;
  };
  source: string;
  target: string;
  id: string;
};
