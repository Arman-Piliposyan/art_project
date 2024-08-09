import { FormControlLabel, FormControl, RadioGroup, FormLabel, Radio } from '@mui/material';
import React from 'react';

import { Sizes } from '../../../constants';

import { useConfigurationContext } from '/src/Contexts';

export const SizeSection = () => {
  const { setConfigurationData, configurationData } = useConfigurationContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfigurationData({ ...configurationData, size: (event.target as HTMLInputElement).value });
  };

  return (
    <FormControl sx={{ mt: '24px' }}>
      <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        value={configurationData.size}
        name="row-radio-buttons-group"
        onChange={handleChange}
      >
        {Sizes.filter((size) => {
          if (!configurationData.proportion) {
            return size;
          }
          return size.availableInProportion === configurationData.proportion;
        }).map((filteredSize) => {
          return (
            <FormControlLabel
              sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}
              label={filteredSize.label}
              value={filteredSize.value}
              key={filteredSize.id}
              control={<Radio />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
