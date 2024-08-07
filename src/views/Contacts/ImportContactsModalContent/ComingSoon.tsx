import { CircularProgress, Typography, TextField, Divider, Button, Box } from '@mui/material';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import SyncIcon from '@mui/icons-material/Sync';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Colors } from '/src/globalStyles/colors';

export const ComingSoon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await axios({
        url: 'https://formbold.com/s/6l1zG',
        data: { email },
        method: 'POST',
      });
      setEmail('');
      toast.success('Success');
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%', width: '100%' }}
    >
      <Box
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          width: '40%',
        }}
      >
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', gap: '16px' }}>
          <SyncIcon sx={{ fontSize: '40px' }} />
          <Typography fontWeight={500} fontSize={40}>
            Coming Soon
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: `${Colors.inputBorder}`,
            width: '180%',
            my: '36px',
          }}
        />
        <TextField
          label="Enter your email address"
          onChange={handleChangeEmail}
          variant="outlined"
          autoComplete="off"
          value={email}
          size="small"
          fullWidth
        />
        <Button
          endIcon={
            isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <AttachEmailIcon />
          }
          disabled={!email || isLoading}
          onClick={handleSubmit}
          variant="contained"
          sx={{ mt: '36px' }}
          fullWidth
        >
          Stay Notified
        </Button>
      </Box>
    </Box>
  );
};
