import { Typography, Button, Grid } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

// eslint-disable-next-line @typescript-eslint/ban-types
type LayoutProps = {};

// eslint-disable-next-line no-empty-pattern
export const ResetPasswordSuccessForm = ({}: LayoutProps): JSX.Element => {
  const navigate = useNavigate();

  const handelGoToLogin = (): void => {
    navigate('/login');
  };

  return (
    <>
      <Grid sx={{ wordWrap: 'break-word' }} xs={12} item>
        <Typography sx={{ fontWeight: '700', fontSize: '26px' }}>Password Reset</Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography sx={{ fontWeight: '400', fontSize: '18px' }}>
          Your password has been successfully reset.Click the button below to log in.
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Button
          sx={{ borderRadius: '20px' }}
          startIcon={<LoginIcon />}
          onClick={handelGoToLogin}
          variant="contained"
          type="submit"
          fullWidth
        >
          Go to Login Page
        </Button>
      </Grid>
    </>
  );
};
