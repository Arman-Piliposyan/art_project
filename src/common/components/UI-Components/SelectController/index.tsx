import { TextField, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';

type option = {
  value: string | number;
  label: string;
};

type Props = {
  defaultValue?: string | number;
  size?: 'medium' | 'small';
  disabled?: boolean;
  fieldName: string;
  options: option[];
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
};

export const SelectController = ({
  disabled = false,
  size = 'small',
  options = [],
  fieldName,
  control,
  label,
}: Props) => {
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, name }, formState: { errors } }) => {
        return (
          <TextField
            helperText={errors[name] && errors[name]?.message}
            error={!!errors[name]}
            onChange={onChange}
            disabled={disabled}
            value={value || ''}
            onBlur={onBlur}
            label={label}
            size={size}
            fullWidth
            select
          >
            {options.map((option, index) => (
              <MenuItem key={`a + ${index}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
      control={control}
      name={fieldName}
    />
  );
};
