import { TextFieldProps, TextField, alpha, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  handleSetDate: (argument: Date | null) => void;
  disabled?: boolean;
  date: Date | null;
};

export const CommonDatePicker = ({ handleSetDate, disabled, date }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
      }}
    >
      <DatePicker
        renderInput={(params: TextFieldProps) => (
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-disabled:hover fieldset': {
                  borderColor: alpha(Colors.inputBorder, 0.5),
                  borderWidth: '1px',
                },
                '&.Mui-disabled fieldset': {
                  borderColor: alpha(Colors.inputBorder, 0.5),
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: Colors.simulacrumPrimary,
                  borderWidth: '1px',
                },
                '&.Mui-error fieldset': {
                  borderColor: Colors.invalidRed,
                  borderWidth: '1px',
                },
                '& fieldset': {
                  borderColor: Colors.inputBorder,
                  borderWidth: '1px',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: '1px',
                },
                height: '40px',
                width: '350px',
              },
            }}
            {...params}
          />
        )}
        onChange={handleSetDate}
        inputFormat="MM/DD/YYYY"
        disabled={disabled}
        value={date}
      />
    </Box>
  );
};
