import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useCampaignsContext } from '../../../CampaignsContext';
import { ConversationsDataType } from './Conversations/types';
import { Conversations } from './Conversations';
import { NoPlayground } from './NoPlayground';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getPlayGroundData } from '/src/services/walleService';

export const Playground = () => {
  const { isPlaygroundStarted, singleCampaignData } = useCampaignsContext();

  const [isTabLoading, setIsTabLoading] = useState(true);
  const [conversationsData, setConversationsData] = useState<ConversationsDataType>(null);

  const getCampaign = async () => {
    try {
      const { data } = await getPlayGroundData(singleCampaignData.id);
      setConversationsData(data);
      setIsTabLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
      setIsTabLoading(false);
    }
  };

  useEffect(() => {
    getCampaign();
  }, []);

  return (
    <>
      {isPlaygroundStarted ? (
        isTabLoading ? (
          <LayoutLoader height="216px" />
        ) : (
          <Conversations setConversationsData={setConversationsData} conversationsData={conversationsData} />
        )
      ) : (
        <NoPlayground />
      )}
    </>
  );
};
