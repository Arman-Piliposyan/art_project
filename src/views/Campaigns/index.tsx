import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { CampaignCreationModalContent } from './CampaignCreationModalContent';
import { useCampaignsContext } from './CampaignsContext';
import { NoCampaignsPage } from './NoCampaignsPage';
import { AllCampaigns } from './AllCampaigns';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { CommonModal } from '/src/common/components/UI-Components/CommonModal';
import { getAllCampaigns } from '/src/services/campaignService';

const Campaigns = () => {
  const { setAllCampaignData, allCampaignData, setOpenModal, openModal } = useCampaignsContext();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const getCampaigns = async () => {
    try {
      const { data } = await getAllCampaigns();
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
      await getCampaigns();
    })();
    return () => {
      localStorage.removeItem('campaignConfigurationStep');
    };
  }, []);

  return (
    <Box sx={{ padding: '24px 48px', height: '100%', width: '100%' }}>
      {isPageLoading ? <LayoutLoader /> : allCampaignData.length ? <AllCampaigns /> : <NoCampaignsPage />}
      <CommonModal
        modalContent={<CampaignCreationModalContent />}
        setOpenModal={setOpenModal}
        open={openModal}
        width="804px"
        padding="0"
      />
    </Box>
  );
};

export default Campaigns;
