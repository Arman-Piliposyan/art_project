import { ReactFlowProvider } from '@xyflow/react';
import React, { useState } from 'react';
import { Box } from '@mui/material';

import { FlowContextProvider } from './FlowContext';
import { Flow } from './Flow';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';

const FollowUpBuilder = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isPageLoading ? (
        <LayoutLoader height="72px" />
      ) : (
        <FlowContextProvider>
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        </FlowContextProvider>
      )}
    </Box>
  );
};

export default FollowUpBuilder;
