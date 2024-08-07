/* eslint-disable @typescript-eslint/ban-ts-comment */
import ELK from 'elkjs/lib/elk.bundled.js';

import { NODE_HEIGHT, NODE_WIDTH } from './constants';
import { NodeDataType, EdgeType } from './types';

const elk = new ELK();

export const elkOptions = {
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.radial.centerOnRoot': 'true',
  'elk.spacing.nodeNode': '80',
  'elk.algorithm': 'mrtree',
};

export const getLayoutedElements = async (nodes: NodeDataType[], edges: EdgeType[], options = {}) => {
  //@ts-ignore
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    children: nodes.map((node) => ({
      ...node,
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      targetPosition: isHorizontal ? 'left' : 'top',
      height: NODE_HEIGHT,
      width: NODE_WIDTH,
    })),
    layoutOptions: options,
    edges: edges,
    id: 'root',
  };

  try {
    //@ts-ignore
    const layoutedGraph = await elk.layout(graph);
    return {
      nodes: layoutedGraph?.children?.map((node) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })),
      edges: layoutedGraph.edges,
    };
  } catch (error) {
    console.error(error);
  }
};

export const deleteNodeAndChildren = (nodeId: string, nodesArray: NodeDataType[], edgesArray: EdgeType[]) => {
  function getChildNodes(parentId: string, edgesArray: EdgeType[]) {
    //@ts-ignore
    let childNodes = [];
    edgesArray.forEach((edge) => {
      if (edge.source === parentId) {
        childNodes.push(edge.target);
        //@ts-ignore
        childNodes = childNodes.concat(getChildNodes(edge.target, edgesArray));
      }
    });
    //@ts-ignore
    return childNodes;
  }

  const nodesToDelete = getChildNodes(nodeId, edgesArray);

  let updatedNodesArray = nodesArray.filter((node) => !nodesToDelete.includes(node.id));

  const updatedEdgesArray = edgesArray.filter(
    (edge) => !nodesToDelete.includes(edge.source) && !nodesToDelete.includes(edge.target),
  );

  const nodeToDelete = nodesArray.find((node) => node.id === nodeId);

  if (nodeToDelete) {
    updatedNodesArray = updatedNodesArray.filter((node) => node.id !== nodeId);

    const newNode = {
      ...nodeToDelete,
      data: { label: undefined, icon: undefined },
      type: 'addNode',
    };

    updatedNodesArray.push(newNode);

    updatedEdgesArray.forEach((edge) => {
      if (edge.target === nodeId) {
        edge.target = newNode.id;
      }
    });
  }

  return {
    updatedNodesArray,
    updatedEdgesArray,
  };
};
