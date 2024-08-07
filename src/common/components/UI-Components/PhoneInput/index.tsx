import ReactInputMask from 'react-input-mask';
import { TextField } from '@mui/material';
import React from 'react';

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  size?: undefined | 'medium' | 'small';
  label?: string;
  value: string;
};

export const PhoneInput = ({ size = 'small', onChange, label, value }: Props) => {
  return (
    <ReactInputMask mask="+999999999999999" onChange={onChange} value={value || ''} maskChar={null}>
      {() => (
        <TextField
          // helperText={errors[name] && errors[name]?.message}
          placeholder="+999999999999999"
          // error={!!errors[name]}
          label={label || 'Phone*'}
          size={size}
          fullWidth
        />
      )}
    </ReactInputMask>
  );
};
