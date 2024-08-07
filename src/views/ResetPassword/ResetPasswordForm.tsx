import { CircularProgress, Typography, Button, Grid } from '@mui/material';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { TextFieldController } from '/src/common/components/UI-Components/TextFieldController';
import { ResetPasswordSchema, authInputStyles } from '/src/constants';
import { resetPasswordPost } from '/src/services/authService';
import { Colors } from '/src/globalStyles/colors';

type LayoutProps = {
  setShowSecondPage: (args: boolean) => void;
};

interface IFormInputs {
  confirmPassword: string;
  password: string;
}

export const ResetPasswordForm = ({ setShowSecondPage }: LayoutProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  const { handleSubmit, control } = useForm<IFormInputs>({
    resolver: yupResolver(ResetPasswordSchema),
    mode: 'onSubmit',
  });

  const handleBackLogin = (): void => {
    navigate('/login');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSendResetPasswordEmail = async (data: IFormInputs): Promise<void> => {
    if (!(token && userId)) {
      setIsLoading(false);
      navigate('/*');
      return;
    }
    setIsLoading(true);
    try {
      await resetPasswordPost({ ...data, userId, token });
      setIsLoading(false);
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
      <Grid sx={{ wordWrap: 'break-word' }} xs={12} item>
        <Typography
          sx={{
            fontWeight: '700',
          }}
          component="div"
          variant="h6"
        >
          Create new password
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography component="div" variant="h6">
          Your new password must be different from previously used passwords.
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <TextFieldController
          passwordIconColor="primary"
          fieldName="password"
          sx={authInputStyles}
          label="Password*"
          control={control}
          type="password"
        />
      </Grid>
      <Grid xs={12} item>
        <TextFieldController
          passwordIconColor="primary"
          fieldName="confirmPassword"
          label="Confirm Password*"
          sx={authInputStyles}
          control={control}
          type="password"
        />
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
          Reset password
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
