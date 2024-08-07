import { FormControlLabel, FormControl, RadioGroup, FormLabel, Radio } from '@mui/material';
import React from 'react';

import { Reflections } from '../../../constants';

import { useConfigurationContext } from '/src/Contexts';

export const ReflectionSection = () => {
  const { setConfigurationData, configurationData } = useConfigurationContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfigurationData({ ...configurationData, reflection: (event.target as HTMLInputElement).value });
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Reflection</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        value={configurationData.reflection}
        name="row-radio-buttons-group"
        onChange={handleChange}
        row
      >
        {Reflections.map((reflection) => {
          return (
            <FormControlLabel
              sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}
              label={reflection.label}
              value={reflection.value}
              control={<Radio />}
              key={reflection.id}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
