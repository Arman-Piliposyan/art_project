import { FormControlLabel, FormControl, RadioGroup, Radio } from '@mui/material';
import React from 'react';

import { Materials } from '../../../constants';

import { useConfigurationContext } from '/src/Contexts';

export const Material = () => {
  const { setConfigurationData, configurationData } = useConfigurationContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfigurationData({ ...configurationData, material: (event.target as HTMLInputElement).value });
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={configurationData.material}
        onChange={handleChange}
      >
        {Materials.map((material) => {
          return (
            <FormControlLabel
              sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}
              label={material.label}
              value={material.value}
              control={<Radio />}
              key={material.id}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
