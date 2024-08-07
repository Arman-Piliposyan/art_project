import { CircularProgress, Typography, Button, Box } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { toast } from 'react-toastify';

import { confirmUserEmail } from '/src/services/authService';
import { Colors } from '/src/globalStyles/colors';

const wrapperStyles = {
  backgroundColor: Colors.rootBackgroundColor,
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  display: 'flex',
  width: '100%',
};

type UserData = {
  isAlreadyConfirmed: boolean;
  isConfirmed: boolean;
  description: boolean;
  email: string;
} | null;

const ConfirmEmail = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (!(token && userId)) {
      setIsLoading(false);
      navigate('/*');
      return;
    }
    (async () => {
      try {
        const { data } = await confirmUserEmail({ userId, token });
        setUserData(data);
        toast.success('Success');
      } catch (error) {
        setError(error.reason);
        toast.error('Fail');
      } finally {
        navigate('/login');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={wrapperStyles}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            width: '100%',
          }}
        >
          <Box>
            <Typography
              sx={{
                marginBottom: '8px',
                color: Colors.black,
                fontSize: '32px',
              }}
              textAlign={'center'}
            >
              {userData?.isConfirmed
                ? 'Your email has been successfully confirmed'
                : userData?.isAlreadyConfirmed
                ? 'Your email has already been confirmed'
                : error
                ? error
                : `${userData?.description}`}
            </Typography>
            <Button
              onClick={() => navigate('/login')}
              sx={{ borderRadius: '20px' }}
              startIcon={<LoginIcon />}
              variant="contained"
              type="submit"
              fullWidth
            >
              Go to Login Page
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ConfirmEmail;
