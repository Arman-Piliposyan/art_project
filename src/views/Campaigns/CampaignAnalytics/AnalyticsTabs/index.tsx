import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react';

import { useCampaignsContext } from '../../CampaignsContext';
import { MessageTabLabel } from './MessageTabLabel';
import { AnalyticsSteps } from '../../constants';
import { Conversations } from './Conversations';

import { Colors } from '/src/globalStyles/colors';

export const AnalyticsTabs = () => {
  const { setAnalyticsStep, analyticsStep } = useCampaignsContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAnalyticsStep(newValue);
  };

  return (
    <Box sx={{ height: 'calc(100% - 68px)', position: 'relative', width: '100%' }}>
      <TabContext value={analyticsStep}>
        <Box
          sx={{
            borderBottom: `1px solid ${Colors.lightGray}`,
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <TabList onChange={handleChange}>
            {AnalyticsSteps.map((item, index) => {
              if (item.name === 'Message') {
                return (
                  <Tab
                    sx={{ color: Colors.black, px: '48px', py: '0px' }}
                    label={<MessageTabLabel label={item.name} />}
                    value={index.toString()}
                    iconPosition="start"
                    icon={item.icon}
                    key={index}
                  />
                );
              }
              return (
                <Tab
                  sx={{ color: Colors.black, px: '48px', py: '0px' }}
                  value={index.toString()}
                  iconPosition="start"
                  label={item.name}
                  icon={item.icon}
                  key={index}
                />
              );
            })}
          </TabList>
        </Box>
        <TabPanel sx={{ height: 'calc(100% - 72px)', padding: '16px' }} value="0"></TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 72px)', padding: '16px' }} value="1"></TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 72px)', padding: '16px' }} value="2">
          <Conversations />
        </TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 72px)', padding: '16px' }} value="3"></TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 72px)', padding: '16px' }} value="4"></TabPanel>
      </TabContext>
    </Box>
  );
};
