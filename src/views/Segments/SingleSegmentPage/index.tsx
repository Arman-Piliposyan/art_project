import { Typography, IconButton, Divider, Tabs, Box, Tab } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { format } from 'date-fns';
import React from 'react';

import { useSegmentsContext } from '../SegmentsContext';
import { CriteriasPanel } from './CriteriasPanel';
import { CustomTabPanel } from './CustomTabPanel';
import { ContactsTable } from './ContactsTable';

import { Colors } from '/src/globalStyles/colors';

export const SingleSegmentPage = () => {
  const { setSingleSegmentData, singleSegmentData } = useSegmentsContext();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleBack = () => {
    setSingleSegmentData(null);
  };

  function a11yProps(index: number) {
    return {
      'aria-controls': `simple-tabpanel-${index}`,
      id: `simple-tab-${index}`,
    };
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <IconButton onClick={handleBack} size="small">
            <ArrowBackIosIcon sx={{ height: '24px', width: '24px' }} />
          </IconButton>
          <Box>
            <Typography fontSize={22}>{singleSegmentData.name}</Typography>
            <Typography fontSize={12}>
              Created on - {format(new Date(singleSegmentData.createdAt), 'MM/dd/yyyy HH:mm')}
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: `${Colors.inputBorder}`,
            width: '100%',
            mb: '24px',
            mt: '16px',
          }}
        />
      </Box>
      <Tabs onChange={handleChange} value={selectedTab} aria-label="tabs">
        <Tab label="Criterias" {...a11yProps(0)} />
        <Tab label="Contacts" {...a11yProps(1)} />
      </Tabs>
      <Divider
        sx={{
          borderColor: `${Colors.inputBorder}`,
          width: '100%',
        }}
      />
      <CustomTabPanel value={selectedTab} index={0}>
        <CriteriasPanel />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <ContactsTable />
      </CustomTabPanel>
    </Box>
  );
};
