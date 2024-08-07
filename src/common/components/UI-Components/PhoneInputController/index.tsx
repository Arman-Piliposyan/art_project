import ReactInputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import React from 'react';

type Props = {
  size?: undefined | 'medium' | 'small';
  inputName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
};

export const PhoneInputController = ({ inputName = 'phone', size = 'small', control }: Props) => {
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, name }, formState: { errors } }) => {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <ReactInputMask
            mask="+999999999999999"
            onChange={onChange}
            value={value || ''}
            maskChar={null}
            onBlur={onBlur}
          >
            {() => (
              <TextField
                helperText={errors[name] && errors[name]?.message}
                error={!!errors[name]}
                label="Phone*"
                size={size}
                fullWidth
              />
            )}
          </ReactInputMask>
        );
      }}
      control={control}
      name={inputName}
    />
  );
};
