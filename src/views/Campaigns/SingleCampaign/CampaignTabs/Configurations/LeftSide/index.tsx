import { Box } from '@mui/material';
import React from 'react';

import { AIPersonalization } from './AIPersonalization';
import { GlobalContext } from './GlobalContext';
import { MessageLength } from './MessageLength';
import { KnowledgeBase } from './KnowledgeBase';
import { MessageTone } from './MessageTone';
import { AIProfile } from './AIProfile';
import { Fallback } from './Fallback';
import { FollowUp } from './FollowUp';
import { Channel } from './Channel';
import { Goal } from './Goal';

import { useCampaignsContext } from '/src/views/Campaigns/CampaignsContext';
import { CampaignTypeEnum } from '/src/views/Campaigns/types';
import { ScrollBarStylesGenerator } from '/src/utils';

export const LeftSide = () => {
  const { singleCampaignData } = useCampaignsContext();

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        width: '100%',
        gap: '16px',
        ...ScrollBarStylesGenerator('100%'),
      }}
    >
      <GlobalContext />
      <Goal />
      <AIPersonalization />
      <MessageTone />
      <MessageLength />
      <KnowledgeBase />
      <AIProfile />
      {singleCampaignData.type !== CampaignTypeEnum.singleChannel && <Fallback />}
      {singleCampaignData.type !== CampaignTypeEnum.singleChannel && <FollowUp />}
      <Channel />
    </Box>
  );
};
