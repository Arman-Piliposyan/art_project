import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { useCampaignsContext } from '../CampaignsContext';
import { Campaign } from './Campaign';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getCampaignData } from '/src/services/campaignService';

const SingleCampaign = () => {
  const { setSingleCampaignData, setPreviewSectionData, setContactTabData, setIsFirstRender, setStep } =
    useCampaignsContext();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { id } = useParams();

  const getCampaign = async (id: string) => {
    try {
      const { data } = await getCampaignData(id);
      setSingleCampaignData(data);
      setIsPageLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    getCampaign(id as string);
    return () => {
      setSingleCampaignData(null);
      setContactTabData(null);
      setIsFirstRender(true);
      setPreviewSectionData(null);
      setStep('1');
      localStorage.removeItem('campaignConfigurationStep');
    };
  }, []);

  return <Box sx={{ height: '100%', width: '100%' }}>{isPageLoading ? <LayoutLoader /> : <Campaign />}</Box>;
};

export default SingleCampaign;
