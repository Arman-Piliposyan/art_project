import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { useCampaignsContext } from '../../../CampaignsContext';
import { PreviewSection } from './RightSide/PreviewSection';
import { LeftSide } from './LeftSide';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getAiConfigurationOptions } from '/src/services/campaignService';
import { getAllFields, getSegment } from '/src/services/segmentService';
import { getAllDocuments } from '/src/services/walleService';

type DocumentDataType = {
  documents: {
    fileRealName: string;
    commitStatus: string;
    documentId: string;
    fileName: string;
  }[];
  groupName: string;
  groupId: string;
};

export const Configurations = () => {
  const { setConfigurationOptions, singleCampaignData, setContactTabData, contactTabData } =
    useCampaignsContext();

  const [isTabLoading, setIsTabLoading] = useState(true);

  const getSegmentData = async () => {
    if (!singleCampaignData.step1.segmentId) {
      return {};
    }
    try {
      const { data } = await getSegment(singleCampaignData.step1.segmentId);
      const segmentContacts = data.contacts.map(
        (contact: { first_name: string; last_name: string; id: string }) => {
          return { label: `${contact.first_name} ${contact.last_name}`, value: contact.id };
        },
      );
      return { segmentContacts };
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllDocuments();
        const fields = await getAllFields();

        const optionsData = await getAiConfigurationOptions();

        const fieldsOptions = fields.data.data.map((field: { label: string; name: string }) => {
          return { label: field.label, value: field.name };
        });

        const options = data.flatMap((item: DocumentDataType) => {
          return [
            { label: item.groupName, value: null },
            ...item.documents.map((document) => {
              return { label: document.fileRealName, value: document.documentId };
            }),
          ];
        });

        setConfigurationOptions({ ...optionsData.data, documentsOptions: options, fieldsOptions });
        const segmentData = await getSegmentData();
        setContactTabData({ ...contactTabData, ...segmentData });
      } catch (error) {
        console.error(error);
        toast.error('Fail');
      } finally {
        setIsTabLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isTabLoading ? (
        <LayoutLoader backgroundColor="#F1F2F7" height="250px" />
      ) : (
        <Box sx={{ height: 'calc(100vh - 205px)', display: 'flex', width: '100%', gap: '16px' }}>
          <Box sx={{ height: '100%', width: '50%' }}>
            <LeftSide />
          </Box>
          <Box sx={{ height: '100%', width: '50%' }}>
            <PreviewSection />
          </Box>
        </Box>
      )}
    </>
  );
};
