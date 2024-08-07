import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  SelectedCampaignDataType,
  ConfigurationOptionsType,
  SingleCampaignDataType,
  PreviewSectionDataType,
  CampaignDataType,
} from './types';

import { saveCampaignPatch } from '/src/services/campaignService';
import { useDidUpdate } from '/src/hooks/useDidUpdate';

type CampaignsContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};

const CampaignsContext = createContext({} as CampaignsContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const CampaignsContextProvider = ({ children }: Props): JSX.Element => {
  const [configurationOptions, setConfigurationOptions] = useState<ConfigurationOptionsType | null>(null);
  const [contactTabData, setContactTabData] = useState<ConfigurationOptionsType | null>(null);
  const [allCampaignData, setAllCampaignData] = useState<CampaignDataType[] | []>([]);
  const [singleCampaignData, setSingleCampaignData] = useState<SingleCampaignDataType | null>(null);
  const [previewSectionData, setPreviewSectionData] = useState<PreviewSectionDataType | null>(null);
  const [step, setStep] = useState(localStorage.getItem('campaignConfigurationStep') || '1');
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [autoSaveLoading, setAutoSaveLoading] = useState(false);

  const [analyticsStep, setAnalyticsStep] = useState(localStorage.getItem('campaignAnalyticsStep') || '2');
  const [selectedCampaignAnalytics, setSelectedCampaignAnalytics] = useState<SelectedCampaignDataType | null>(
    null,
  );

  useDidUpdate(() => {
    localStorage.setItem('campaignConfigurationStep', step);
  }, [step]);

  useDidUpdate(() => {
    localStorage.setItem('campaignAnalyticsStep', analyticsStep);
  }, [analyticsStep]);

  useEffect(() => {
    if (!singleCampaignData) {
      return;
    }
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    (async () => {
      try {
        setAutoSaveLoading(true);
        await saveCampaignPatch({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          payload: singleCampaignData[`step${step}`],
          campaignId: singleCampaignData.id,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setAutoSaveLoading(false);
        }, 500);
      }
    })();
  }, [singleCampaignData]);

  const contextData = {
    setSelectedCampaignAnalytics,
    selectedCampaignAnalytics,
    setConfigurationOptions,
    setPreviewSectionData,
    setSingleCampaignData,
    configurationOptions,
    previewSectionData,
    setAllCampaignData,
    singleCampaignData,
    setContactTabData,
    setAnalyticsStep,
    setIsFirstRender,
    autoSaveLoading,
    allCampaignData,
    contactTabData,
    analyticsStep,
    setOpenModal,
    openModal,
    setStep,
    step,
  };

  return <CampaignsContext.Provider value={contextData}>{children}</CampaignsContext.Provider>;
};

export const useCampaignsContext = () => {
  const contextData = useContext(CampaignsContext);
  return contextData;
};
