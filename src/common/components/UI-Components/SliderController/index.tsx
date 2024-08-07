import { Typography, Slider, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  size?: 'medium' | 'small';
  disabled?: boolean;
  fieldName: string;
  label?: string;
  step?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  min?: number;
  max?: number;
};

export const SliderController = ({
  disabled = false,
  size = 'small',
  fieldName,
  max = 100,
  step = 1,
  control,
  min = 0,
  label,
}: Props) => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        return (
          <Box sx={{ width: '100%' }}>
            {label && (
              <Typography
                sx={{
                  color: disabled ? `${Colors.white + 80}` : '',
                  marginBottom: '6px',
                }}
              >
                {label}
              </Typography>
            )}
            <Box
              sx={{
                justifyContent: 'flex-end',
                display: 'flex',
                width: '100%',
              }}
            >
              <Slider
                valueLabelDisplay="on"
                sx={{ width: '80%' }}
                onChange={onChange}
                disabled={disabled}
                value={value || 0}
                size={size}
                step={step}
                min={min}
                max={max}
              />
            </Box>
          </Box>
        );
      }}
      control={control}
      name={fieldName}
    />
  );
};
