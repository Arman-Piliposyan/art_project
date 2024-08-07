import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';

import { ConditionsTab } from './ConditionsTab';
import { useFlowContext } from '../FlowContext';
import { ActionsTab } from './ActionsTab';

import { Colors } from '/src/globalStyles/colors';

export const AddNodeSidebarContent = () => {
  const { selectedConditionData } = useFlowContext();

  const [analyticsStep, setAnalyticsStep] = useState(selectedConditionData ? '1' : '0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAnalyticsStep(newValue);
  };

  return (
    <Box sx={{ height: '100%', width: '100%', p: '16px' }}>
      <TabContext value={analyticsStep}>
        <Box
          sx={{
            borderBottom: `1px solid ${Colors.lightGray}`,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <TabList onChange={handleChange} centered>
            {!selectedConditionData && (
              <Tab
                sx={{
                  color: Colors.black,
                  px: '48px',
                  py: '0px',
                }}
                iconPosition="start"
                label={'Actions'}
                key={'Actions'}
                value={'0'}
              />
            )}
            <Tab
              sx={{
                color: Colors.black,
                px: '48px',
                py: '0px',
              }}
              iconPosition="start"
              label={'Conditions'}
              key={'Conditions'}
              value={'1'}
            />
          </TabList>
        </Box>
        {!selectedConditionData && (
          <TabPanel sx={{ height: 'calc(100% - 35px)', padding: '16px' }} value="0">
            <ActionsTab />
          </TabPanel>
        )}
        <TabPanel sx={{ height: 'calc(100% - 35px)', padding: '16px' }} value="1">
          <ConditionsTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
