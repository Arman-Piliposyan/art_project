import { Typography, Divider, Box } from '@mui/material';
import React from 'react';

import { useSegmentsContext } from '../SegmentsContext';
import { SegmentGetDataType } from '../types';
import { SegmentItem } from './SegmentItem';

import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export const SegmentsTable = () => {
  const { allSegments } = useSegmentsContext();

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Segment Name
          </Typography>
        </Box>
        <Box sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Status
          </Typography>
        </Box>
        <Box sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Count
          </Typography>
        </Box>
        <Box sx={{ width: '25%', pl: '16px' }}>
          <Typography sx={{ marginBottom: '16px' }} fontWeight={700}>
            Actions
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: `${Colors.inputBorder}`,
          width: '100%',
        }}
      />
      <Box sx={{ ...ScrollBarStylesGenerator('calc(100% - 32px)'), paddingRight: '12px', mt: '16px' }}>
        {allSegments.map((segment: SegmentGetDataType) => {
          return <SegmentItem key={segment.segmentId} segment={segment} />;
        })}
      </Box>
    </Box>
  );
};
