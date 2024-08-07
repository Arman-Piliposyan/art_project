import { CircularProgress, Typography, Button, Grid } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { TextFieldController } from '/src/common/components/UI-Components/TextFieldController';
import { RegistrationSchema, authInputStyles } from '/src/constants';
import { registrationPost } from '/src/services/authService';
import { Colors } from '/src/globalStyles/colors';

type LayoutProps = {
  setShowRegistrationSuccessPage: (args: boolean) => void;
  setRegistrationEmail: (args: string) => void;
};

interface IFormInputs {
  organizationName: string;
  confirmPassword: string;
  password: string;
  email: string;
}

interface FieldsErrors {
  email?: string[];
  name?: string[];
}

export const RegistrationPage = ({
  setShowRegistrationSuccessPage,
  setRegistrationEmail,
}: LayoutProps): JSX.Element => {
  const [organizationCreationError, setOrganizationCreationError] = useState({
    email: '',
    name: '',
  });
  const { handleSubmit, clearErrors, setError, control } = useForm<IFormInputs>({
    resolver: yupResolver(RegistrationSchema),
    mode: 'onSubmit',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleClickNext = async (data: IFormInputs) => {
    try {
      setIsLoading(true);
      await registrationPost({
        ...data,
        name: data.organizationName,
      });
      setRegistrationEmail(data.email);
      setShowRegistrationSuccessPage(true);
    } catch (error) {
      if (error?.response?.data?.errors.email || error?.response?.data?.errors.name) {
        const fieldsErrors: FieldsErrors = error.response.data.errors;
        setOrganizationCreationError({
          email: fieldsErrors.email ? fieldsErrors.email[0] : '',
          name: fieldsErrors.name ? fieldsErrors.name[0] : '',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(organizationCreationError)) {
      if (key === 'name') {
        if (!value) {
          clearErrors(['organizationName']);
          continue;
        }
        setError('organizationName', {
          message: value as string,
          type: 'invalid',
        });
      }
      if (key === 'email') {
        if (!value) {
          clearErrors([key as 'email']);
          continue;
        }
        setError(key as 'email', {
          message: value as string,
          type: 'invalid',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationCreationError]);

  return (
    <>
      <Grid spacing={1.5} container item>
        <Grid xs={12} item>
          <Typography sx={{ fontWeight: '700', fontSize: '26px' }}>Create Account</Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography sx={{ fontWeight: '400', fontSize: '18px' }}>
            Already have an account?{' '}
            <NavLink style={{ color: Colors.simulacrumPrimary }} to="/login">
              Sign in
            </NavLink>
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <TextFieldController
            fieldName="organizationName"
            label="Organization Name*"
            sx={authInputStyles}
            control={control}
          />
        </Grid>
        <Grid xs={12} item>
          <TextFieldController sx={authInputStyles} fieldName="email" control={control} label="Email*" />
        </Grid>
        <Grid spacing={1} container xs={12} item>
          <Grid xs={12} md={6} item>
            <TextFieldController
              passwordIconColor="primary"
              fieldName="password"
              sx={authInputStyles}
              label="Password*"
              control={control}
              type="password"
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <TextFieldController
              fieldName="confirmPassword"
              passwordIconColor="primary"
              label="Confirm Password*"
              sx={authInputStyles}
              control={control}
              type="password"
            />
          </Grid>
        </Grid>
        <Grid xs={12} item>
          <Button
            endIcon={
              isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <NavigateNextIcon />
            }
            onClick={handleSubmit(handleClickNext)}
            sx={{ borderRadius: '20px' }}
            variant="contained"
            type="submit"
            fullWidth
          >
            Sign Up
          </Button>
        </Grid>
        <Grid xs={12} item>
          <Typography
            sx={{
              '@media (max-width: 600px)': {
                fontSize: '10px',
              },
              fontWeight: '300',
              fontSize: '12px',
            }}
            textAlign={'center'}
          >
            By creating an account, you are agreeing to our{' '}
            <Link style={{ color: Colors.simulacrumPrimary }} to="#">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="https://simulacrumai.com/privacy-policy/" style={{ color: Colors.simulacrumPrimary }}>
              Privacy Policy
            </Link>
            . You also agree to receive product-related marketing emails from Simulacrum AI, which you can
            unsubscribe from at any time.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
