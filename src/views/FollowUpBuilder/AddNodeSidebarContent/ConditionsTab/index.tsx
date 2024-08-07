import { Typography, Box } from '@mui/material';
import React from 'react';

import { Conditions } from '../../constants';
import { Condition } from './Condition';

import { ScrollBarStylesGenerator } from '/src/utils';

export const ConditionsTab = () => {
  const groupedConditions = Object.groupBy(Conditions, ({ group }) => group);

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', height: '100%', width: '100%', gap: '16px' }}>
      <Typography fontWeight={600} align="center">
        Add conditions to your sequence and create decisions branches to get the best results possible
      </Typography>
      <Box sx={{ ...ScrollBarStylesGenerator('calc(100% - 22px)') }}>
        <Box sx={{ mb: '32px' }}>
          <Typography sx={{ mb: '8px' }} fontWeight={500} fontSize={14}>
            Lead information
          </Typography>
          <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: '16px' }}>
            {groupedConditions.information?.map((condition) => {
              return <Condition condition={condition} key={condition.key} />;
            })}
          </Box>
        </Box>
        <Box>
          <Typography sx={{ mb: '8px' }} fontWeight={500} fontSize={14}>
            Lead actions
          </Typography>
          <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: '16px' }}>
            {groupedConditions.actions?.map((condition) => {
              return <Condition condition={condition} key={condition.key} />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
