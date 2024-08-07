import {
  FormControlLabel,
  TextFieldProps,
  Typography,
  TextField,
  Checkbox,
  Slider,
  Box,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React, { useState } from 'react';

import { PhoneInput } from '/src/common/components/UI-Components/PhoneInput';
import { Colors } from '/src/globalStyles/colors';

export const RightSide = () => {
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChangeScheduleDate = (argument: Date | null) => {
    setScheduleDate(argument);
  };

  const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: Colors.paperBackgroundColor,
        justifyContent: 'space-between',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        height: '100%',
        width: '75%',
      }}
    >
      <Box sx={{ flexDirection: 'column', display: 'flex', width: '30%', gap: '32px' }}>
        <FormControlLabel
          sx={{ width: 'max-content', marginLeft: '0px' }}
          label="Start campaign immediately"
          control={<Checkbox />}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderInput={(params: TextFieldProps) => <TextField size="small" {...params} />}
            onChange={handleChangeScheduleDate}
            inputFormat="MM/DD/YYYY"
            maxDate={new Date()}
            value={scheduleDate}
          />
        </LocalizationProvider>
        <FormControlLabel
          sx={{ width: 'max-content', marginLeft: '0px' }}
          label="Enable Email Notifications"
          control={<Checkbox />}
        />
        <FormControlLabel
          sx={{ width: 'max-content', marginLeft: '0px' }}
          label="Enable Daily AI Report"
          control={<Checkbox />}
        />
        <PhoneInput
          onChange={handleChangePhoneNumber}
          label="Phone Number"
          value={phoneNumber}
          size="small"
        />
      </Box>
      <Box sx={{ flexDirection: 'column', display: 'flex', width: '30%', gap: '24px' }}>
        <Box sx={{ flexDirection: 'column', display: 'flex', width: '100%', gap: '12px' }}>
          <Typography>Maximum message per contact</Typography>
          <Slider
            marks={[
              {
                label: '1',
                value: 1,
              },
              {
                label: '12',
                value: 12,
              },
            ]}
            sx={{ marginLeft: '8px', width: '85%' }}
            // onChange={handleChangeFollowUpDays}
            valueLabelDisplay="auto"
            // value={followUpDays}
            size="small"
            step={1}
            max={12}
            min={1}
          />
        </Box>
      </Box>
    </Box>
  );
};
