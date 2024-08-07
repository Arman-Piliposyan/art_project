import { CircularProgress, Typography, Button, Grid } from '@mui/material';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Lottie from 'lottie-react';

import { animationJson } from '../Registration/animation';

import { forgotPasswordPost } from '/src/services/authService';
import { Colors } from '/src/globalStyles/colors';

type LayoutProps = { email: string };

export const ForgotPasswordSuccessForm = ({ email }: LayoutProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handelGoToLogin = (): void => {
    navigate('/login');
  };

  const handleResendEmail = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await forgotPasswordPost(email);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
          Password reset link sent to your email. Check your inbox and follow the instructions to reset.
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
          An email has been sent to your {email} inbox. Please click on the provided link to verify your email
          address and complete the registration process.
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
          endIcon={
            isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <ForwardToInboxIcon />
          }
          onClick={handleResendEmail}
          variant="contained"
          type="submit"
          fullWidth
        >
          Click to Resend
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
          onClick={handelGoToLogin}
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
