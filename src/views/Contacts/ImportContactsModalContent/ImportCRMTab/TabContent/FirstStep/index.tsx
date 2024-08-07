import { FormControl, RadioGroup, Box } from '@mui/material';
import { BroadcastChannel } from 'broadcast-channel';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useImportContactsContext } from '../../../ImportContactsContext';
import { SalesForceIntegrationCard } from './SalesForce';
import { FreshDeskIntegrationCard } from './Freshdesk';
import { HubSpotIntegrationCard } from './HubSpot';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getIsIntegrations } from '/src/services/salesForceService';

export const FirstStep = () => {
  const { setImportCRMTabData, importCRMTabData } = useImportContactsContext();

  const [isPageLoading, setIsPageLoading] = useState(importCRMTabData.step1.isSalesForceIntegrated === null);
  const [openBroadcastChannel, setOpenBroadcastChannel] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportCRMTabData({
      ...importCRMTabData,
      step1: { ...importCRMTabData.step1, selectedCRM: (event.target as HTMLInputElement).value },
    });
  };

  const getSalesForceIntegrated = async () => {
    try {
      const {
        data: { data },
      } = await getIsIntegrations();
      const findSalesForce = data.find(
        (item: { integrationType: string }) => item.integrationType === 'salesforce',
      );

      setImportCRMTabData({
        ...importCRMTabData,
        step1: { ...importCRMTabData.step1, isSalesForceIntegrated: findSalesForce?.status === 'integrated' },
      });
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    if (importCRMTabData.step1.isSalesForceIntegrated || !openBroadcastChannel) {
      return;
    }
    const channel = new BroadcastChannel('SalesForce');
    channel.onmessage = (msg) => {
      if (msg === 'integrated') {
        setImportCRMTabData({
          ...importCRMTabData,
          step1: { ...importCRMTabData.step1, isSalesForceIntegrated: true },
        });
        true;
        toast.success('Success');
        channel.close();
        setOpenBroadcastChannel(false);
      }
    };
  }, [openBroadcastChannel]);

  useEffect(() => {
    if (importCRMTabData.step1.isSalesForceIntegrated !== null) {
      return;
    }
    (async () => {
      await getSalesForceIntegrated();
    })();
  }, []);

  return (
    <>
      {isPageLoading ? (
        <LayoutLoader height="162px" />
      ) : (
        <Box sx={{ height: '100%', width: '100%' }}>
          <FormControl sx={{ height: '100%', width: '100%' }}>
            <RadioGroup
              sx={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', width: '100%', gap: '24px' }}
              value={importCRMTabData.step1.selectedCRM}
              onChange={handleChange}
            >
              <SalesForceIntegrationCard setOpenBroadcastChannel={setOpenBroadcastChannel} />
              <HubSpotIntegrationCard />
              <FreshDeskIntegrationCard />
            </RadioGroup>
          </FormControl>
        </Box>
      )}
    </>
  );
};
