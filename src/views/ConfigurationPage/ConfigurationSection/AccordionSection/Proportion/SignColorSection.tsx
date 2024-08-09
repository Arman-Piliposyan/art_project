import { FormControlLabel, FormControl, RadioGroup, FormLabel, Radio } from '@mui/material';
import React from 'react';

import { SignColors } from '../../../constants';

import { useConfigurationContext } from '/src/Contexts';

export const SignColorSection = () => {
  const { setConfigurationData, configurationData } = useConfigurationContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfigurationData({
      ...configurationData,
      signColor: (event.target as HTMLInputElement).value,
      proportion: '',
    });
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Color</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        value={configurationData.signColor}
        name="row-radio-buttons-group"
        onChange={handleChange}
        row
      >
        {SignColors.map((signColor) => {
          return (
            <FormControlLabel
              sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}
              label={signColor.label}
              value={signColor.value}
              control={<Radio />}
              key={signColor.id}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
