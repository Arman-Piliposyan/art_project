import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { BroadcastChannel } from 'broadcast-channel';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { postSalesForceToken } from '/src/services/salesForceService';
import { Colors } from '/src/globalStyles/colors';

const IntegrationSalesForcePage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [params] = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const code = params.get('code');
        if (!code) {
          return;
        }
        await postSalesForceToken(code);
        const channel = new BroadcastChannel('SalesForce');
        channel.postMessage('integrated');
        setIsPageLoading(false);
        window.close();
      } catch (error) {
        console.error(error);
        toast.error('Fail');
      } finally {
        setIsPageLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      {isPageLoading ? (
        <LayoutLoader height="80px" />
      ) : (
        <Box
          sx={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              backgroundColor: Colors.successGreen,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              padding: '16px',
              display: 'flex',
              height: '70px',
              color: 'white',
              width: '70px',
            }}
          >
            <CheckCircleOutlineRoundedIcon sx={{ height: '40px', width: '40px' }} color="inherit" />
          </Box>
          <Typography color={Colors.successGreen} fontWeight={300} fontSize={48}>
            Success
          </Typography>
          <Typography fontWeight={300} fontSize={24}>
            Your integrations has been processed successfully
          </Typography>
          <Typography fontWeight={300} fontSize={22}>
            You'll be redirected to the Integrations page or click the button below
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default IntegrationSalesForcePage;
