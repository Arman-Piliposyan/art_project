import { CircularProgress, Typography, TextField, Divider, Button, Box } from '@mui/material';
import DockIcon from '@mui/icons-material/Dock';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { PhoneInput } from '/src/common/components/UI-Components/PhoneInput';
import { connectTwilio } from '/src/services/twilioService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  toggleSidebar: () => void;
  getIntegrated: () => void;
};

export const TwilioIntegrationForm = ({ toggleSidebar, getIntegrated }: Props) => {
  const { organizationInfo } = useOrganizationContext();

  const [integrationData, setIntegrationData] = useState({
    phoneNumber: '',
    accountSid: '',
    authToken: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) {
      return;
    }
    setIntegrationData({ ...integrationData, phoneNumber: event.target.value });
  };

  const handleChangeAuthToken = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, authToken: event.target.value });
  };

  const handleChangeAccountSid = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, accountSid: event.target.value });
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectTwilio({ organizationName: organizationInfo.name, ...integrationData });
      getIntegrated();
      setIsLoading(false);
      toggleSidebar();
      toast.success('Success');
    } catch (error) {
      console.error(error);
      toast.error('Fail');
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '8px 24px', height: '100%' }}>
      <Typography fontSize={20}>Twilio Integration</Typography>
      <Divider
        sx={{
          borderBottomWidth: '1px',
          marginTop: '4px',
        }}
      />
      <Box
        sx={{
          justifyContent: 'space-between',
          height: 'calc(100% - 72px)',
          flexDirection: 'column',
          display: 'flex',
          mt: '24px',
        }}
      >
        <Box
          sx={{
            flexDirection: 'column',
            display: 'flex',
            gap: '16px',
          }}
        >
          <TextField
            value={integrationData.accountSid}
            onChange={handleChangeAccountSid}
            label="Account Sid*"
            autoComplete="off"
            size="small"
          />
          <TextField
            value={integrationData.authToken}
            onChange={handleChangeAuthToken}
            label="Auth Token*"
            autoComplete="off"
            size="small"
          />
          <PhoneInput value={integrationData.phoneNumber} onChange={handleChangePhoneNumber} size="small" />
        </Box>
        <Button
          disabled={
            !integrationData.accountSid ||
            !integrationData.authToken ||
            !integrationData.phoneNumber ||
            isLoading
          }
          startIcon={isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <DockIcon />}
          onClick={handleConnect}
          variant="contained"
        >
          Connect
        </Button>
      </Box>
    </Box>
  );
};
