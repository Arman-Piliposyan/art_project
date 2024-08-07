import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { SegmentCreationPage } from './SegmentCreationPage';
import { SingleSegmentPage } from './SingleSegmentPage';
import { useSegmentsContext } from './SegmentsContext';
import { AllSegmentsPage } from './AllSegmentsPage';
import { NoSegmentsPage } from './NoSegmentsPage';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getAllSegments } from '/src/services/segmentService';

const Segments = () => {
  const { isSegmentCreationPageOpen, singleSegmentData, isSegmentCreated, setAllSegments, allSegments } =
    useSegmentsContext();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const getSegments = async () => {
    try {
      const { data } = await getAllSegments();
      setAllSegments(data.data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getSegments();
    })();
  }, [isSegmentCreated]);

  return (
    <Box sx={{ padding: '24px 48px', height: '100%', width: '100%' }}>
      {isPageLoading ? (
        <LayoutLoader />
      ) : isSegmentCreationPageOpen ? (
        <SegmentCreationPage />
      ) : singleSegmentData ? (
        <SingleSegmentPage />
      ) : allSegments.length ? (
        <AllSegmentsPage />
      ) : (
        <NoSegmentsPage />
      )}
    </Box>
  );
};

export default Segments;
