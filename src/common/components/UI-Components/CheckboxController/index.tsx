import { Checkbox, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  defaultValue?: boolean;
  dataTestId?: string;
  disabled?: boolean;
  fieldName: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
};

export const CheckboxController = ({
  disabled = false,
  label = '',
  dataTestId,
  fieldName,
  control,
}: Props) => {
  return (
    <Controller
      render={({ field: { onChange, value, name }, formState: { errors } }) => {
        return (
          <Box sx={{ alignItems: 'center', flexWrap: 'nowrap', display: 'flex' }}>
            <Checkbox
              sx={{
                color: errors?.[name] && Colors.invalidRed,
              }}
              data-test-id={dataTestId}
              checked={value || false}
              disabled={disabled}
              onChange={onChange}
            />
            <span
              style={{
                color: disabled ? `${Colors.white + 80}` : '',
                fontSize: '13px',
              }}
            >
              {label}
            </span>
          </Box>
        );
      }}
      control={control}
      name={fieldName}
    />
  );
};
