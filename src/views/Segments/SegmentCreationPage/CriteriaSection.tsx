import { CircularProgress, Typography, Button, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';

import { useSegmentsContext } from '../SegmentsContext';
import { CriteriaItem } from './CriteriaItem';
import { CriteriaDataType } from '../types';

import { saveSegmentPost } from '/src/services/segmentService';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export const CriteriaSection = () => {
  const { setIsSegmentCreationPageOpen, setIsSegmentCreated, segmentName, criterias } = useSegmentsContext();

  const [isLoading, setIsLoading] = useState(false);

  const listRef = useRef<HTMLInputElement>(null);

  const handleCloseCreationPage = () => {
    setIsSegmentCreated((prev: boolean) => !prev);
    setIsSegmentCreationPageOpen(false);
  };

  const handleSaveSegment = async () => {
    setIsLoading(true);
    try {
      await saveSegmentPost({ conditions: criterias, name: segmentName });
      toast.success('Success');
      setIsLoading(false);
      setIsSegmentCreated((prev: boolean) => !prev);
      setIsSegmentCreationPageOpen(false);
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        toast.error(error.response.data.reason);
        return;
      }
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    listRef.current.scrollTo({
      behavior: 'smooth',
      top: 20000,
    });
  }, [criterias]);

  return (
    <Box sx={{ height: 'calc(100% - 68px)', width: '100%' }}>
      <Typography sx={{ mb: '6px' }} fontSize={14}>
        Criteria
      </Typography>
      <Box sx={{ ...ScrollBarStylesGenerator('calc(100% - 110px)') }} ref={listRef}>
        {criterias.map((criteria: CriteriaDataType, index: number) => {
          return <CriteriaItem criteria={criteria} index={index} key={index} />;
        })}
      </Box>
      <Box sx={{ flexDirection: 'column', alignItems: 'center', display: 'flex', gap: '8px', mt: '6px' }}>
        <Typography sx={{ width: '850px' }} textAlign="center" fontSize={14}>
          Note: Each contact can only belong to one segment at a time. If you attempt to assign a contact to a
          segment they already belong to, the system will not allow it.
        </Typography>
        <Box sx={{ justifyContent: 'center', display: 'flex', gap: '16px', mt: '8px' }}>
          <Button
            endIcon={isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <SaveIcon />}
            onClick={handleSaveSegment}
            disabled={isLoading}
            variant="contained"
            color="primary"
            size="small"
          >
            Save Segment
          </Button>
          <Button
            onClick={handleCloseCreationPage}
            disabled={isLoading}
            variant="contained"
            color="secondary"
            size="small"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
