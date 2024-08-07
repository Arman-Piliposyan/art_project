import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { LayoutLoader } from '../../components/UI-Components/LayoutLoader';
import { AppDrawer } from '../../components/AppDrawer';

import { getTwilioPhoneNumber, checkTwilioStatus } from '/src/services/twilioService';
import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { getOrganizationData } from '/src/services/organizationService';
import { getUserData } from '/src/services/userService';
import { Colors } from '/src/globalStyles/colors';
import { checkIsAuthorized } from '/src/utils';
// import { applicationHealthCheck, startDasha } from '/src/services/dashaService';

export const Layout = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const { setOrganizationInfo, setUserInfo } = useOrganizationContext();

  useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      try {
        const { data } = await getUserData();
        setUserInfo(data);
        localStorage.setItem('userData', JSON.stringify(data));
        setOrganizationId(data.organizationId);
        if (pathname === '/') {
          navigate('/dashboard');
        }
      } catch (error) {
        if (error.response.status === 401 && refreshToken) {
          const isAuthorized = await checkIsAuthorized(refreshToken);
          if (!isAuthorized) {
            localStorage.clear();
            navigate('/login');
            return;
          }
          window.location.reload();
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!organizationId) {
      return;
    }
    (async () => {
      try {
        const { data } = await getOrganizationData(organizationId);
        const phoneData = await getTwilioPhoneNumber();
        const twilioStatusData = await checkTwilioStatus();
        setOrganizationInfo({
          ...data,
          TwilioStatus: twilioStatusData.data,
          Phone: phoneData.data.phoneNumber,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLayoutLoading(false);
      }
    })();

    // const socket = io(BASE_URL as string, {
    //   transports: ['websocket', 'polling'],
    //   path: '/notification/socket.io',
    //   query: { organizationId },
    // });
    // socket.on('tokensCount', ({ tokensCount }) => {
    //   setTokensCount(tokensCount);
    // });
    // return () => {
    //   socket.disconnect();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', height: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        <AppDrawer isLayoutLoading={isLayoutLoading} />
        <Box
          sx={{
            backgroundColor: Colors.white,
            height: 'calc(100vh - 55px)',
            flexGrow: 1,
            mt: '55px',
            p: 1,
          }}
          component="main"
        >
          {isLayoutLoading ? <LayoutLoader /> : <Outlet />}
        </Box>
      </Box>
    </Box>
  );
};
