import { FormControlLabel, FormControl, RadioGroup, FormLabel, Radio } from '@mui/material';
import React from 'react';

import { ReflectionColors } from '../../../constants';

import { useConfigurationContext } from '/src/Contexts';

export const ReflectionColorSection = () => {
  const { setConfigurationData, configurationData } = useConfigurationContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfigurationData({ ...configurationData, reflectionColor: (event.target as HTMLInputElement).value });
  };

  return (
    <FormControl sx={{ mt: '24px' }}>
      <FormLabel id="demo-row-radio-buttons-group-label">Reflection Color</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        value={configurationData.reflectionColor}
        name="row-radio-buttons-group"
        onChange={handleChange}
        row
      >
        {ReflectionColors.map((reflectionColor) => {
          return (
            <FormControlLabel
              sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}
              label={reflectionColor.label}
              value={reflectionColor.value}
              key={reflectionColor.id}
              control={<Radio />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
