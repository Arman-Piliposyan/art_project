import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { useCampaignsContext } from '../CampaignsContext';
import { MainAnalyticsPage } from './MainAnalyticsPage';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getCampaignData } from '/src/services/campaignService';

const CampaignAnalytics = () => {
  const { setSelectedCampaignAnalytics, setAnalyticsStep } = useCampaignsContext();

  const [isPageLoading, setIsPageLoading] = useState(true);

  const { id } = useParams();

  const getSelectedCampaign = async (id: string) => {
    try {
      const { data } = await getCampaignData(id);
      setSelectedCampaignAnalytics(data);
      setIsPageLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    getSelectedCampaign(id as string);
    return () => {
      localStorage.removeItem('campaignAnalyticsStep');
      setAnalyticsStep('0');
    };
  }, []);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isPageLoading ? <LayoutLoader /> : <MainAnalyticsPage />}
    </Box>
  );
};

export default CampaignAnalytics;
