import { InputAdornment, IconButton, TextField } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { InputProps, SxProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import React, { useState } from 'react';

type Props = {
  passwordIconColor?: 'secondary' | 'primary' | 'success' | 'warning' | 'inherit' | 'default' | 'info';
  type?: 'password' | 'number' | 'text';
  size?: 'medium' | 'small';
  inputProps?: InputProps;
  defaultValue?: string;
  dataTestId?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  fieldName: string;
  minRows?: number;
  maxRows?: number;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  sx?: SxProps;
};

export const TextFieldController = ({
  passwordIconColor = undefined,
  multiline = false,
  fullWidth = true,
  disabled = false,
  inputProps = {},
  size = 'small',
  type = 'text',
  minRows = 1,
  maxRows = 1,
  dataTestId,
  fieldName,
  control,
  label,
  sx,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, name }, formState: { errors } }) => {
        return (
          <TextField
            InputProps={
              type === 'password'
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} color={passwordIconColor} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    ...inputProps,
                  }
                : inputProps
            }
            helperText={errors[name] && errors[name]?.message}
            type={showPassword ? 'text' : type}
            data-test-id={dataTestId}
            error={!!errors[name]}
            fullWidth={fullWidth}
            multiline={multiline}
            onChange={onChange}
            value={value || ''}
            disabled={disabled}
            autoComplete="off"
            minRows={minRows}
            maxRows={maxRows}
            onBlur={onBlur}
            label={label}
            size={size}
            sx={sx}
          />
        );
      }}
      control={control}
      name={fieldName}
    />
  );
};
