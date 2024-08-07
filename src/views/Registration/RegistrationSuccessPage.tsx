import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Typography, Button, Grid } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import React from 'react';

import { animationJson } from './animation';

import { resendConfirmEmail } from '/src/services/authService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  registrationEmail: string;
};

export const RegistrationSuccessPage = ({ registrationEmail }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleBackLogin = () => {
    navigate('/login');
  };

  const resendVerifyEmail = async () => {
    await resendConfirmEmail(registrationEmail);
  };

  return (
    <>
      <Grid xs={12} item>
        <Lottie
          style={{
            height: 100,
          }}
          animationData={animationJson}
          width={200}
        />
      </Grid>
      <Grid sx={{ wordWrap: 'break-word' }} xs={12} item>
        <Typography
          sx={{
            '@media (max-width: 650px)': {
              fontWeight: '500',
              fontSize: '18px',
            },
            '@media (max-width: 389px)': {
              fontSize: '12px',
            },
            fontWeight: '700',
            fontSize: '26px',
          }}
          textAlign={'center'}
        >
          Thank you for registering! Please verify your email address.
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          sx={{
            '@media (max-width: 650px)': {
              fontSize: '8px',
            },
            fontWeight: '400',
            fontSize: '12px',
          }}
          textAlign={'center'}
        >
          An email has been sent to your inbox. Please click on the provided link to verify your email address
          and complete the registration process.
        </Typography>
      </Grid>
      <Grid justifyContent={'center'} sx={{ my: '8px' }} container item>
        <Button
          sx={{
            '@media (max-width: 490px)': {
              width: '100%',
            },
            borderRadius: '20px',
            width: '70%',
          }}
          endIcon={<ForwardToInboxIcon />}
          onClick={resendVerifyEmail}
          variant="contained"
          type="submit"
          fullWidth
        >
          Resend Verification Email
        </Button>
      </Grid>
      <Grid justifyContent={'center'} container item>
        <Button
          sx={{
            '&:hover': {
              backgroundColor: Colors.simulacrumPrimary,
              color: Colors.white,
            },
            '@media (max-width: 490px)': {
              width: '100%',
            },
            color: Colors.simulacrumPrimary,
            borderRadius: '20px',
            width: '70%',
          }}
          onClick={handleBackLogin}
          endIcon={<LoginIcon />}
          variant="outlined"
          type="submit"
          fullWidth
        >
          Go to Login Page
        </Button>
      </Grid>
    </>
  );
};
