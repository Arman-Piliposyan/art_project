import { BroadcastChannel } from 'broadcast-channel';
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';

import { TwilioIntegrationForm } from './Twilio/TwilioIntegrationForm';
import { OpenAiIntegrationForm } from './OpenAi/OpenAiIntegrationForm';
import { SmtpIntegrationForm } from './Smtp/SmtpIntegrationForm';
import { IntegrationList, IntegrationType } from './constants';
import { SalesForceIntegrationCard } from './SalesForce';
import { TwilioIntegrationCard } from './Twilio';
import { OpenAiIntegrationCard } from './OpenAi';
import { GmailIntegrationCard } from './Gmail';
import { SmtpIntegrationCard } from './Smtp';
import { Linkedin } from './Linkedin';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getIsIntegrations } from '/src/services/salesForceService';
import { getIsTwilioIntegrated } from '/src/services/twilioService';
import { checkLinkedinStatus } from '/src/services/linkedinService';
import { getIsSmtpIntegrated } from '/src/services/smtpService';
import { checkGmailStatus } from '/src/services/googleService';
import { getIsOpenAiIntegrated } from '/src/services/openAi';
import { SideBar } from '/src/common/components/SideBar';

const Integration = () => {
  const [isSmtpIntegrated, setIsSmtpIntegrated] = useState(false);
  const [isGmailIntegrated, setIsGmailIntegrated] = useState(false);
  const [isTwilioIntegrated, setIsTwilioIntegrated] = useState(false);
  const [isOpenAiIntegrated, setIsOpenAiIntegrated] = useState(false);
  const [isLinkedinIntegrated, setIsLinkedinIntegrated] = useState(false);
  const [isSalesForceIntegrated, setIsSalesForceIntegrated] = useState(false);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedIntegrationIndex, setSelectedIntegrationIndex] = useState<number | null>(null);
  const [openGmailBroadcastChannel, setOpenGmailBroadcastChannel] = useState(false);
  const [openBroadcastChannel, setOpenBroadcastChannel] = useState(false);
  const [openLinkedinChannel, setOpenLinkedinChannel] = useState(false);

  const toggleSidebar = () => {
    if (selectedIntegrationIndex) {
      setSelectedIntegrationIndex(null);
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarContent = () => {
    switch (selectedIntegrationIndex) {
      case 0:
        return null;
      case 1:
        return <TwilioIntegrationForm getIntegrated={getTwilioIntegrated} toggleSidebar={toggleSidebar} />;
      case 2:
        return <OpenAiIntegrationForm getIntegrated={getOpenAiIntegrated} toggleSidebar={toggleSidebar} />;
      case 4:
        return <SmtpIntegrationForm getIntegrated={getSmtpIntegrated} toggleSidebar={toggleSidebar} />;
      default:
        return null;
    }
  };

  const getSalesForceIntegrated = async () => {
    try {
      const {
        data: { data },
      } = await getIsIntegrations();
      const findSalesForce = data.find(
        (item: { integrationType: string }) => item.integrationType === 'salesforce',
      );
      setIsSalesForceIntegrated(findSalesForce?.status === 'integrated');
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const getLinkedinIntegrated = async () => {
    try {
      const { data } = await checkLinkedinStatus();
      setIsLinkedinIntegrated(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const getGmailIntegrated = async () => {
    try {
      const { data } = await checkGmailStatus();
      setIsGmailIntegrated(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const getTwilioIntegrated = async () => {
    try {
      const { data } = await getIsTwilioIntegrated();
      setIsTwilioIntegrated(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const getSmtpIntegrated = async () => {
    try {
      const { data } = await getIsSmtpIntegrated();
      setIsSmtpIntegrated(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const getOpenAiIntegrated = async () => {
    try {
      const {
        data: { isIntegrated },
      } = await getIsOpenAiIntegrated();
      setIsOpenAiIntegrated(isIntegrated);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  useEffect(() => {
    (async () => {
      await getSalesForceIntegrated();
      await getTwilioIntegrated();
      await getLinkedinIntegrated();
      await getGmailIntegrated();
      await getOpenAiIntegrated();
      await getSmtpIntegrated();
      setIsPageLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (isSalesForceIntegrated || !openBroadcastChannel) {
      return;
    }
    const channel = new BroadcastChannel('SalesForce');
    channel.onmessage = (msg) => {
      if (msg === 'integrated') {
        setIsSalesForceIntegrated(true);
        toast.success('Success');
        channel.close();
        setOpenBroadcastChannel(false);
      }
    };
  }, [openBroadcastChannel]);

  useEffect(() => {
    if (isLinkedinIntegrated || !openLinkedinChannel) {
      return;
    }
    const channel = new BroadcastChannel('Linkedin');
    channel.onmessage = (msg) => {
      if (msg === 'integrated') {
        setIsLinkedinIntegrated(true);
        toast.success('Success');
        channel.close();
        setOpenLinkedinChannel(false);
      }
    };
  }, [openLinkedinChannel]);

  useEffect(() => {
    if (isGmailIntegrated || !openGmailBroadcastChannel) {
      return;
    }
    const channel = new BroadcastChannel('Gmail');
    channel.onmessage = (msg) => {
      if (msg === 'integrated') {
        setIsGmailIntegrated(true);
        toast.success('Success');
        channel.close();
        setOpenGmailBroadcastChannel(false);
      }
    };
  }, [openGmailBroadcastChannel]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isPageLoading ? (
        <LayoutLoader height="80px" />
      ) : (
        <Box sx={{ height: '100%', width: '100%' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={500} fontSize={22}>
            Integration
          </Typography>
          <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: '16px' }}>
            <SalesForceIntegrationCard
              integrationItem={IntegrationList[0] as IntegrationType}
              setIsSalesForceIntegrated={setIsSalesForceIntegrated}
              setOpenBroadcastChannel={setOpenBroadcastChannel}
              key={IntegrationList[0].integrationType}
              getIntegrated={getSalesForceIntegrated}
              isIntegrated={isSalesForceIntegrated}
            />
            <TwilioIntegrationCard
              setSelectedIntegrationIndex={setSelectedIntegrationIndex}
              integrationItem={IntegrationList[1] as IntegrationType}
              key={IntegrationList[1].integrationType}
              setIsSidebarOpen={setIsSidebarOpen}
              getIntegrated={getTwilioIntegrated}
              isIntegrated={isTwilioIntegrated}
              index={1}
            />
            <OpenAiIntegrationCard
              setSelectedIntegrationIndex={setSelectedIntegrationIndex}
              integrationItem={IntegrationList[2] as IntegrationType}
              key={IntegrationList[2].integrationType}
              setIsSidebarOpen={setIsSidebarOpen}
              getIntegrated={getOpenAiIntegrated}
              isIntegrated={isOpenAiIntegrated}
              index={2}
            />
            <GmailIntegrationCard
              setOpenGmailBroadcastChannel={setOpenGmailBroadcastChannel}
              integrationItem={IntegrationList[3] as IntegrationType}
              setIsGmailIntegrated={setIsGmailIntegrated}
              key={IntegrationList[3].integrationType}
              getIntegrated={getGmailIntegrated}
              isIntegrated={isGmailIntegrated}
            />
            <SmtpIntegrationCard
              setSelectedIntegrationIndex={setSelectedIntegrationIndex}
              integrationItem={IntegrationList[4] as IntegrationType}
              key={IntegrationList[4].integrationType}
              setIsSidebarOpen={setIsSidebarOpen}
              getIntegrated={getSmtpIntegrated}
              isIntegrated={isSmtpIntegrated}
              index={4}
            />
            <Linkedin
              integrationItem={IntegrationList[5] as IntegrationType}
              setIsLinkedinIntegrated={setIsLinkedinIntegrated}
              setOpenLinkedinChannel={setOpenLinkedinChannel}
              key={IntegrationList[5].integrationType}
              getIntegrated={getLinkedinIntegrated}
              isIntegrated={isLinkedinIntegrated}
            />
          </Box>
          <SideBar toggleDrawer={toggleSidebar} isOpen={isSidebarOpen}>
            <Box sx={{ height: '100vh', width: '450px' }}>{sidebarContent()}</Box>
          </SideBar>
        </Box>
      )}
    </Box>
  );
};

export default Integration;
