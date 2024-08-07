import { Typography, Button, Box } from '@mui/material';
import React from 'react';

import { ReflectionColors, Reflections, Materials, Sizes } from '../constants';

import { useConfigurationContext } from '/src/Contexts';
import { Colors } from '/src/globalStyles/colors';

export const InfoSection = () => {
  const { configurationData } = useConfigurationContext();

  const findMaterial = Materials.find((material) => material.value === configurationData.material);
  const findReflection = Reflections.find((reflection) => reflection.value === configurationData.reflection);
  const findReflectionColor = ReflectionColors.find(
    (reflectionColor) => reflectionColor.value === configurationData.reflectionColor,
  );
  const findSize = Sizes.find((size) => size.value === configurationData.size);

  return (
    <Box sx={{ backgroundColor: Colors.lightGray, flexDirection: 'column', display: 'flex', p: '8px' }}>
      <Box sx={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}>
        <Typography sx={{ width: '180px', height: '56px' }} fontWeight={700}>
          {findMaterial ? findMaterial.label : 'Signage'}
        </Typography>
        <Typography fontWeight={700} fontSize={24}>
          € 00,00
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', width: '100%', mb: '16px' }}>
        <Box sx={{ flexDirection: 'column', display: 'flex', width: '60%' }}>
          <Typography fontSize={12}>- Sign: {findMaterial?.name}</Typography>
          <Typography fontSize={12}>- Color of sign:</Typography>
          <Typography fontSize={12}>- Size: {findSize?.label}</Typography>
          <Typography fontSize={12}>
            - Reflection: {findReflection?.label}
            {findReflection?.value === 'noReflection'
              ? ''
              : findReflectionColor
              ? ` (${findReflectionColor.label})`
              : ''}
          </Typography>
        </Box>

        <Box sx={{ flexDirection: 'column', alignItems: 'end', display: 'flex', width: '40%' }}>
          <Typography fontSize={12}>Prijs exclusief 21% BTW</Typography>
        </Box>
      </Box>

      <Box sx={{ justifyContent: 'flex-end', display: 'flex', width: '100%' }}>
        <Button sx={{ p: '4px 48px' }} variant="contained" color="primary">
          BESTELLEN
        </Button>
      </Box>
    </Box>
  );
};
