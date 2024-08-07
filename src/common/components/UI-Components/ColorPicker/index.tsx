import { OutlinedInput, Typography, Box } from '@mui/material';
import React from 'react';

type Props = {
  onChange: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
};

export const ColorPicker = ({ onChange, label, value }: Props) => {
  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        width: '270px',
      }}
    >
      <Typography fontSize={12}>{label}</Typography>
      <OutlinedInput
        sx={{
          '& .MuiOutlinedInput-input': { padding: 0 },
          borderRadius: '6px',
          padding: '4px',
          width: '50px',
        }}
        onChange={onChange}
        value={value}
        type="color"
        size="small"
      />
    </Box>
  );
};
