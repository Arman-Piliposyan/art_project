import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { NoCampaignsPage } from './NoCampaignsPage';
import { AllCampaigns } from './AllCampaigns';
import { CampaignDataType } from './types';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getAllCampaigns } from '/src/services/campaignService';

const Playground = () => {
  const [allCampaignData, setAllCampaignData] = useState<CampaignDataType[] | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const getSegments = async () => {
    try {
      const { data } = await getAllCampaigns('4');
      setAllCampaignData(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getSegments();
    })();
    return () => {
      localStorage.removeItem('campaignConfigurationStep');
    };
  }, []);

  return (
    <Box sx={{ padding: '8px', height: '100%', width: '100%' }}>
      {isPageLoading ? (
        <LayoutLoader />
      ) : allCampaignData && allCampaignData.length ? (
        <AllCampaigns allCampaignData={allCampaignData} />
      ) : (
        <NoCampaignsPage />
      )}
    </Box>
  );
};

export default Playground;
