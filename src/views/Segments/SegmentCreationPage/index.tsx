import { Typography, TextField, Divider, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useSegmentsContext } from '../SegmentsContext';
import { CriteriaSection } from './CriteriaSection';
import { criteriaInitialData } from '../constants';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getConditions, getAllFields } from '/src/services/segmentService';
import { Colors } from '/src/globalStyles/colors';

export const SegmentCreationPage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { setSegmentName, setFieldsData, setConditions, setCriterias, segmentName, conditions, fieldsData } =
    useSegmentsContext();

  const handleSegmentNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSegmentName(event.currentTarget.value);
  };

  const conditionsGet = async () => {
    try {
      const { data } = await getConditions();
      setConditions(data.conditions);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const getFields = async () => {
    try {
      const { data } = await getAllFields();
      setFieldsData(data.data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  useEffect(() => {
    (async () => {
      setCriterias([criteriaInitialData]);
      setSegmentName('');
      if (!fieldsData) {
        await getFields();
      }
      if (!conditions) {
        await conditionsGet();
      }
      setIsPageLoading(false);
    })();
  }, []);

  return (
    <>
      <Typography fontSize={22}>Create Segment</Typography>
      <Divider
        sx={{
          borderColor: `${Colors.inputBorder}`,
          width: '100%',
          mb: '50px',
          mt: '16px',
        }}
      />
      {isPageLoading ? (
        <LayoutLoader height="224px" />
      ) : (
        <Box
          sx={{
            height: 'calc(100% - 110px)',
            flexDirection: 'column',
            display: 'flex',
            width: '100%',
            gap: '32px',
          }}
        >
          <TextField
            onChange={handleSegmentNameChange}
            sx={{ width: '350px' }}
            label="Segment Name*"
            value={segmentName}
            autoComplete="off"
            size="small"
          />
          <CriteriaSection />
        </Box>
      )}
    </>
  );
};
