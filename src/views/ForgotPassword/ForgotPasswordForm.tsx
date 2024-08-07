import { CircularProgress, Typography, Button, Grid } from '@mui/material';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { TextFieldController } from '/src/common/components/UI-Components/TextFieldController';
import { ForgotPasswordSchema, authInputStyles } from '/src/constants';
import { forgotPasswordPost } from '/src/services/authService';
import { Colors } from '/src/globalStyles/colors';

type LayoutProps = {
  setShowSecondPage: (args: boolean) => void;
  setEmail: (args: string) => void;
};

interface IFormInputs {
  email: string;
}

export const ForgotPasswordForm = ({ setShowSecondPage, setEmail }: LayoutProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<IFormInputs>({
    resolver: yupResolver(ForgotPasswordSchema),
    mode: 'onSubmit',
  });

  const handleBackLogin = (): void => {
    navigate('/login');
  };

  const handleSendResetPasswordEmail = async (data: IFormInputs): Promise<void> => {
    setIsLoading(true);
    try {
      await forgotPasswordPost(data.email);
      setIsLoading(false);
      setEmail(data.email);
      setShowSecondPage(true);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid xs={12} item>
        <Typography sx={{ fontWeight: '700', fontSize: '26px' }}>Forgot Password?</Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography sx={{ fontWeight: '400', fontSize: '18px' }}>
          Enter your email address below to receive a link to reset your password.
        </Typography>
      </Grid>
      <Grid container xs={12} item>
        <TextFieldController sx={authInputStyles} fieldName="email" control={control} label="Email*" />
      </Grid>
      <Grid xs={12} item>
        <Button
          endIcon={
            isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <NearMeOutlinedIcon />
          }
          onClick={handleSubmit(handleSendResetPasswordEmail)}
          sx={{ borderRadius: '20px' }}
          variant="contained"
          type="submit"
          fullWidth
        >
          Send Mail
        </Button>
      </Grid>
      <Grid xs={12} item>
        <Button
          sx={{
            '&:hover': {
              backgroundColor: Colors.simulacrumPrimary,
              color: Colors.white,
            },
            color: Colors.simulacrumPrimary,
            borderRadius: '20px',
          }}
          onClick={handleBackLogin}
          endIcon={<LoginIcon />}
          variant="outlined"
          type="submit"
          fullWidth
        >
          Back to login
        </Button>
      </Grid>
    </>
  );
};
