import { TextFieldProps, TextField, alpha, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  handleStartDate: (argument: Date | null) => void;
  handleEndDate: (argument: Date | null) => void;
  startDate: Date | null;
  endDate: Date | null;
};

export const DateRangePicker = ({ handleStartDate, handleEndDate, startDate, endDate }: Props) => {
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
                width: '170px',
              },
            }}
            autoComplete="off"
            size="small"
            {...params}
          />
        )}
        onChange={handleStartDate}
        inputFormat="MM/DD/YYYY"
        maxDate={new Date()}
        label="Start Date"
        value={startDate}
      />

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
                width: '170px',
              },
            }}
            autoComplete="off"
            size="small"
            {...params}
          />
        )}
        // minDate={startDate < endDate ? startDate : endDate}
        onChange={handleEndDate}
        disabled={!startDate}
        maxDate={new Date()}
        label="End Date"
        value={endDate}
      />
    </Box>
  );
};
