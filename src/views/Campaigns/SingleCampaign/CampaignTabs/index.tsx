import { CircularProgress, Button, Box, Tab } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useCampaignsContext } from '../../CampaignsContext';
import { Configurations } from './Configurations';
import styles from './CampaignTabs.module.scss';
import { CampaignSteps } from '../../constants';
import { CampaignTypeEnum } from '../../types';
import { Playground } from './Playground';
import { Contacts } from './Contacts';
import { Overview } from './Overview';

import { saveAndPublish } from '/src/services/campaignService';
import FollowUpBuilder from '/src/views/FollowUpBuilder';
import { Colors } from '/src/globalStyles/colors';

export const CampaignTabs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { singleCampaignData, autoSaveLoading, setStep, step } = useCampaignsContext();

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setStep(newValue);
  };

  const handleNextStep = () => {
    setStep((prevState: string) => (Number(prevState) + 1).toString());
  };

  const handleSaveAndPublish = () => {
    setIsLoading(true);
    try {
      saveAndPublish(singleCampaignData.id);
      toast.success('Success');
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      toast.error('Fail');
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      <TabContext value={step}>
        <Box
          sx={{
            borderBottom: `1px solid ${Colors.lightGray}`,
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <TabList sx={{ minHeight: '24px' }} onChange={handleChange}>
            {CampaignSteps.map((item, index) => {
              if (singleCampaignData.type === CampaignTypeEnum.singleChannel && item.name === 'Follow-Up') {
                return null;
              }
              return (
                <Tab
                  sx={{
                    color: Colors.black,
                    minHeight: '32px',
                    px: '48px',
                    py: '8px',
                  }}
                  value={(index + 1).toString()}
                  iconPosition="start"
                  label={item.name}
                  icon={item.icon}
                  key={index}
                />
              );
            })}
          </TabList>
          {autoSaveLoading && (
            <Box
              sx={{
                paddingRight: '16px',
              }}
            >
              <Box className={styles.spinner}></Box>
            </Box>
          )}
        </Box>
        <TabPanel sx={{ height: 'calc(100% - 32px)', padding: '16px' }} value="1">
          <Contacts />
        </TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 32px)', backgroundColor: '#F1F2F7', padding: '16px' }} value="2">
          <Configurations />
        </TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 32px)', padding: '16px' }} value="3">
          <FollowUpBuilder />
        </TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 32px)', padding: '16px' }} value="4">
          <Box>Executions</Box>
        </TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 32px)', padding: '16px' }} value="5">
          <Overview />
        </TabPanel>
        <TabPanel sx={{ height: 'calc(100% - 32px)', padding: '16px' }} value="6">
          <Playground />
        </TabPanel>
      </TabContext>
      {step !== '6' && (
        <Button
          endIcon={
            isLoading ? (
              <CircularProgress sx={{ color: Colors.white }} size={20} />
            ) : step === '4' ? (
              <SaveIcon />
            ) : (
              <NavigateNextIcon />
            )
          }
          onClick={step === '5' ? handleSaveAndPublish : handleNextStep}
          sx={{ position: 'absolute', bottom: '12px', right: '12px' }}
          disabled={isLoading}
          variant="contained"
          size="small"
        >
          {step === '5' ? 'Save and Publish' : 'Next'}
        </Button>
      )}
    </Box>
  );
};
