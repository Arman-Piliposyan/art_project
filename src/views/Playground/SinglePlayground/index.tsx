import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { ConversationsDataType } from './Conversations/types';
import { Conversations } from './Conversations';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getPlayGroundData } from '/src/services/walleService';

const SinglePlayground = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [conversationsData, setConversationsData] = useState<ConversationsDataType>(null);

  const { id } = useParams();

  const getCampaign = async (id: string) => {
    try {
      const { data } = await getPlayGroundData(id);
      setConversationsData(data);
      setIsPageLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    getCampaign(id as string);
  }, []);

  return (
    <Box sx={{ p: '0 8px 8px 8px', height: '100%', width: '100%' }}>
      {isPageLoading ? (
        <LayoutLoader />
      ) : (
        <Conversations setConversationsData={setConversationsData} conversationsData={conversationsData} />
      )}
    </Box>
  );
};

export default SinglePlayground;
