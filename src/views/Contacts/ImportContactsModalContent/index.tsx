import { Typography, Link, Box, Tab } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import React from 'react';

import { useImportContactsContext } from './ImportContactsContext';
import { ImportContactsSteps } from '../constants';
import { ImportCSVTab } from './ImportCSVTab';
import { ImportCRMTab } from './ImportCRMTab';
import { ComingSoon } from './ComingSoon';

import { Colors } from '/src/globalStyles/colors';
import { ContactSupportIcon } from '/src/assets';

const tabStyles = { width: 'calc(100% - 250px)', padding: '16px', height: '100%' };

type Props = {
  setUpdateContacts: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ImportContactsModalContent = ({ setUpdateContacts, setOpenModal }: Props) => {
  const { setTab, tab } = useImportContactsContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '8px',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <TabContext value={tab}>
        <Box
          sx={{
            borderRight: `1px solid ${Colors.lightGray}`,
            flexDirection: 'column',
            position: 'relative',
            display: 'flex',
            width: '300px',
          }}
        >
          <Typography sx={{ padding: '16px', mb: '1px' }} fontWeight={500}>
            Import Contacts
          </Typography>
          <TabList
            sx={{
              '& .MuiTab-root.Mui-selected': {
                backgroundColor: Colors.paperBackgroundColor,
                borderRadius: '5px',
                fontWeight: '500',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              padding: '16px',
            }}
            onChange={handleChange}
            orientation="vertical"
            variant="scrollable"
          >
            {ImportContactsSteps.map((item, index) => {
              return (
                <Tab
                  sx={{
                    my: item.name === 'Prospect Searcher' ? '24px' : '',
                    justifyContent: 'start',
                    fontFamily: 'Poppins',
                    minHeight: '48px',
                    fontWeight: '400',
                    display: 'flex',
                    height: '48px',
                  }}
                  value={index.toString()}
                  iconPosition="start"
                  label={item.name}
                  icon={item.icon}
                  key={index}
                />
              );
            })}
          </TabList>
          <Box
            sx={{
              backgroundColor: `${Colors.lightGray + 20}`,
              borderTop: `1px solid ${Colors.lightGray}`,
              borderRadius: '0 0 0 8px',
              flexDirection: 'column',
              height: 'max-content',
              position: 'absolute',
              padding: '16px 32px',
              display: 'flex',
              width: '100%',
              gap: '12px',
              bottom: '0',
            }}
          >
            <ContactSupportIcon />
            <Typography fontSize={12}>Having trouble importing your contacts into Simulacrum AI?</Typography>
            <Link sx={{ cursor: 'pointer' }} fontSize={12}>
              Contact Support
            </Link>
          </Box>
        </Box>
        <TabPanel sx={tabStyles} value="0">
          <ImportCSVTab setUpdateContacts={setUpdateContacts} setOpenModal={setOpenModal} />
        </TabPanel>
        <TabPanel sx={tabStyles} value="1">
          <ImportCRMTab setUpdateContacts={setUpdateContacts} setOpenModal={setOpenModal} />
        </TabPanel>
        <TabPanel sx={tabStyles} value="2">
          <ComingSoon />
        </TabPanel>
        <TabPanel sx={tabStyles} value="3">
          <ComingSoon />
        </TabPanel>
        <TabPanel sx={tabStyles} value="4">
          <ComingSoon />
        </TabPanel>
        <TabPanel sx={tabStyles} value="5">
          <ComingSoon />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
