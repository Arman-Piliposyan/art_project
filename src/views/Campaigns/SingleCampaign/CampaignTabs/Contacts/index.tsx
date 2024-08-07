import { Typography, TextField, MenuItem, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useCampaignsContext } from '../../../CampaignsContext';
import { OptionsType } from '../../../types';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getAllSegments, getSegment } from '/src/services/segmentService';
import { Condition } from '/src/views/Segments/constants';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { Colors } from '/src/globalStyles/colors';
import { ChannelIcon } from '/src/assets';

export const Contacts = () => {
  const { setSingleCampaignData, singleCampaignData, setContactTabData, contactTabData } =
    useCampaignsContext();
  const [isTabLoading, setIsTabLoading] = useState(true);

  const handleSelectSegment = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSingleCampaignData({
      ...singleCampaignData,
      step1: { ...singleCampaignData.step1, segmentId: event.target.value },
    });
  };

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
      return { criteria: data.details, segmentContacts };
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const getAllSegmentData = async () => {
    try {
      const { data } = await getAllSegments();
      const segmentsOptions = data.data
        .filter((segment: { segmentId: string; status: boolean }) => {
          return singleCampaignData.step1.segmentId === segment.segmentId || !segment.status;
        })
        .map((item: { segmentId: number; name: string }) => {
          return { value: item.segmentId, label: item.name };
        });
      return segmentsOptions;
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  useDidUpdate(() => {
    (async () => {
      try {
        const data = await getSegmentData();
        setContactTabData({ ...contactTabData, ...data });
      } catch (error) {
        console.error(error);
        toast.error('Fail');
      }
    })();
  }, [singleCampaignData.step1.segmentId]);

  useEffect(() => {
    (async () => {
      try {
        const segmentsOptions = await getAllSegmentData();
        const data = await getSegmentData();
        setContactTabData({ ...contactTabData, segmentsOptions, ...data });
        setIsTabLoading(false);
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
        <LayoutLoader height="250px" />
      ) : (
        <Box
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '8px',
            display: 'flex',
            padding: '16px',
            height: '420px',
            width: '100%',
            gap: '24px',
          }}
        >
          <Box
            sx={{
              borderBottom: `1px solid ${Colors.simulacrumPrimary}`,
              flexDirection: 'column',
              paddingBottom: '48px',
              alignItems: 'center',
              display: 'flex',
              width: '100%',
              gap: '12px',
            }}
          >
            <ChannelIcon />
            <Typography align="center">Choose a Contact Segment</Typography>
            <TextField
              helperText={!contactTabData.segmentsOptions.length ? 'You do not have unused segment' : ''}
              disabled={!contactTabData.segmentsOptions.length}
              value={singleCampaignData.step1.segmentId || ''}
              onChange={handleSelectSegment}
              sx={{ width: '40%' }}
              label="Segment"
              size="small"
              select
            >
              {contactTabData.segmentsOptions?.map((option: OptionsType) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Typography align="center" fontSize={20}>
            {contactTabData.segmentContacts
              ? `🎉 Found ${contactTabData.segmentContacts.length} Contacts`
              : 'Choose segment'}
          </Typography>
          <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: '8px' }}>
            {contactTabData.criteria?.map(
              (
                criteria: {
                  conditionNum: number;
                  fieldName: string;
                  value: string;
                },
                index: number,
              ) => {
                return (
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      height: 'max-content',
                      width: 'max-content',
                      borderRadius: '16px',
                      padding: '6px 18px',
                    }}
                    key={index}
                  >
                    <Typography>
                      {criteria.fieldName} {Condition[criteria.conditionNum as number]} {criteria.value}
                    </Typography>
                  </Box>
                );
              },
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
