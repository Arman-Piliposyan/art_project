import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Button, Grid } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';

import { TextFieldController } from '/src/common/components/UI-Components/TextFieldController';
import { authInputStyles, errorMessages, LoginSchema } from '/src/constants';
import { loginPost } from '/src/services/authService';
import { Colors } from '/src/globalStyles/colors';

interface IFormInputs {
  password: string;
  email: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError,
    control,
    watch,
  } = useForm<IFormInputs>({
    resolver: yupResolver(LoginSchema),
    mode: 'onSubmit',
  });

  const signInClick = async (loginData: IFormInputs): Promise<void> => {
    setIsLoading(true);
    const requestData = {
      password: loginData.password,
      email: loginData.email,
    };
    try {
      const { data } = await loginPost(requestData);
      if (data.role !== 'admin') {
        setError('email', {
          message: errorMessages.invalidCredentials,
          type: 'invalid',
        });
        return;
      }
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      const { data } = error.response;
      if (data.reason) {
        setError('email', { message: data.reason, type: 'invalid' });
      }
    }
  };

  useEffect(() => {
    if (!errors.email || errors.email.type !== 'invalid') {
      return;
    }
    clearErrors(['email']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('password')]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(signInClick)();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid xs={12} item>
        <Typography sx={{ fontWeight: '700', fontSize: '26px' }}>Sign In</Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography sx={{ fontWeight: '400', fontSize: '18px' }}>
          Don’t have an account?{' '}
          <NavLink style={{ color: Colors.simulacrumPrimary }} to="/registration">
            Create now
          </NavLink>
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <TextFieldController sx={authInputStyles} fieldName="email" control={control} label="Email*" />
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
        <Grid sx={{ justifyContent: 'flex-end', display: 'flex' }} xs={12} item>
          <NavLink
            style={{
              color: Colors.simulacrumPrimary,
              fontWeight: '400',
              fontSize: '12px',
            }}
            to="/forgot-password"
          >
            Forgot Password?
          </NavLink>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Button
          startIcon={isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <LoginIcon />}
          disabled={isLoading || !!Object.keys(errors).length}
          onClick={handleSubmit(signInClick)}
          sx={{ borderRadius: '20px' }}
          variant="contained"
          fullWidth
        >
          Sign in
        </Button>
      </Grid>
    </>
  );
};
