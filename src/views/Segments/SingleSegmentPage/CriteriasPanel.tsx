import { Typography, Box } from '@mui/material';
import React from 'react';

import { useSegmentsContext } from '../SegmentsContext';
import { CriteriaDataType } from '../types';
import { Condition } from '../constants';

import { Colors } from '/src/globalStyles/colors';

export const CriteriasPanel = () => {
  const {
    singleSegmentData: { conditions },
  } = useSegmentsContext();

  return (
    <Box sx={{ height: '100%', width: '100%', p: 1 }}>
      <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: '16px' }}>
        {conditions.map((criteria: Omit<CriteriaDataType, 'type'>, index: number) => {
          return (
            <Box
              sx={{
                backgroundColor: Colors.paperBackgroundColor,
                height: 'max-content',
                width: 'max-content',
                borderRadius: '16px',
                padding: '6px 18px',
              }}
              key={index}
            >
              <Typography>
                {criteria.name} {Condition[criteria.conditionNum as number]} {criteria.value}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
