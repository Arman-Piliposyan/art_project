import { FormControlLabel, FormControl, RadioGroup, FormLabel, Radio } from '@mui/material';
import React from 'react';

import { Proportions } from '../../../constants';

import { useConfigurationContext } from '/src/Contexts';
import { Colors } from '/src/globalStyles/colors';

export const ProportionSection = () => {
  const { setConfigurationData, configurationData } = useConfigurationContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfigurationData({
      ...configurationData,
      proportion: (event.target as HTMLInputElement).value,
      size: '',
    });
  };

  return (
    <FormControl sx={{ mt: '24px' }}>
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{ mb: '16px' }}>
        Proportion
      </FormLabel>
      <RadioGroup
        sx={{
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          display: 'flex',
          gap: '12px',
          pl: '12px',
        }}
        aria-labelledby="demo-row-radio-buttons-group-label"
        value={configurationData.signColor}
        name="row-radio-buttons-group"
        onChange={handleChange}
        row
      >
        {Proportions.filter((proportion) => {
          if (!configurationData.signColor) {
            return proportion;
          }
          return (
            proportion.data.availableColors.includes('all') ||
            proportion.data.availableColors.includes(configurationData.signColor)
          );
        }).map((filteredProportion) => {
          return (
            <FormControlLabel
              sx={{
                backgroundColor:
                  filteredProportion.value === configurationData.proportion ? Colors.colorPrimary : 'white',
                borderRadius: filteredProportion.value === 'circle' ? '50%' : '2px',
                '& .MuiTypography-root': { fontSize: '10px' },
                '& .MuiButtonBase-root': { display: 'none' },
                height: filteredProportion.data.size.height,
                width: filteredProportion.data.size.width,
                justifyContent: 'center',
                transition: 'all 0.3s',
                alignItems: 'center',
                display: 'flex',
              }}
              label={filteredProportion.label}
              value={filteredProportion.value}
              key={filteredProportion.id}
              control={<Radio />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
