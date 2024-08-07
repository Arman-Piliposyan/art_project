import {
  CircularProgress,
  FormControlLabel,
  Typography,
  TextField,
  Checkbox,
  Divider,
  Button,
  Box,
} from '@mui/material';
import DockIcon from '@mui/icons-material/Dock';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { connectSmtp } from '/src/services/smtpService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  toggleSidebar: () => void;
  getIntegrated: () => void;
};

export const SmtpIntegrationForm = ({ toggleSidebar, getIntegrated }: Props) => {
  const [integrationData, setIntegrationData] = useState({
    smtpEnable: false,
    imapEnable: false,
    smtpHost: '',
    smtpUser: '',
    smtpPass: '',
    imapHost: '',
    imapUser: '',
    imapPass: '',
    smtpPort: '',
    imapPort: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeSmtpUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, smtpUser: event.target.value });
  };

  const handleChangeSmtpPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, smtpPass: event.target.value });
  };

  const handleChangeSmtpHost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, smtpHost: event.target.value });
  };

  const handleChangeSmtpPort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, smtpPort: event.target.value });
  };

  const handleChangeSmtpEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({
      ...integrationData,
      smtpEnable: event.target.checked,
    });
  };

  const handleChangeImapUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, imapUser: event.target.value });
  };

  const handleChangeImapPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, imapPass: event.target.value });
  };

  const handleChangeImapHost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, imapHost: event.target.value });
  };

  const handleChangeImapPort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({ ...integrationData, imapPort: event.target.value });
  };

  const handleChangeImapEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationData({
      ...integrationData,
      imapEnable: event.target.checked,
    });
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectSmtp({
        ...integrationData,
        smtpPort: Number(integrationData.smtpPort),
        imapPort: Number(integrationData.imapPort),
      });
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
      <Typography fontSize={20}>SMTP Integration</Typography>
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
          <Typography>SMTP Settings</Typography>
          <TextField
            value={integrationData.smtpUser}
            onChange={handleChangeSmtpUser}
            label="SMTP User*"
            autoComplete="off"
            size="small"
          />
          <TextField
            value={integrationData.smtpPass}
            onChange={handleChangeSmtpPass}
            label="SMTP Password*"
            autoComplete="off"
            size="small"
          />
          <TextField
            value={integrationData.smtpHost}
            onChange={handleChangeSmtpHost}
            label="SMTP Host*"
            autoComplete="off"
            size="small"
          />
          <TextField
            value={integrationData.smtpPort}
            onChange={handleChangeSmtpPort}
            label="SMTP Port*"
            autoComplete="off"
            type="number"
            size="small"
          />
          <FormControlLabel
            control={<Checkbox checked={integrationData.smtpEnable} onChange={handleChangeSmtpEnable} />}
            sx={{ justifyContent: 'start', gap: '16px', m: '0' }}
            labelPlacement="start"
            label="SSL Enable"
          />

          <Typography sx={{ mt: '12px' }}>IMAP Settings</Typography>
          <TextField
            value={integrationData.imapUser}
            onChange={handleChangeImapUser}
            label="IMAP User*"
            autoComplete="off"
            size="small"
          />
          <TextField
            value={integrationData.imapPass}
            onChange={handleChangeImapPass}
            label="IMAP Password*"
            autoComplete="off"
            size="small"
          />
          <TextField
            value={integrationData.imapHost}
            onChange={handleChangeImapHost}
            label="IMAP Host*"
            autoComplete="off"
            size="small"
          />
          <TextField
            value={integrationData.imapPort}
            onChange={handleChangeImapPort}
            label="IMAP Port*"
            autoComplete="off"
            type="number"
            size="small"
          />
          <FormControlLabel
            control={<Checkbox checked={integrationData.imapEnable} onChange={handleChangeImapEnable} />}
            sx={{ justifyContent: 'start', gap: '16px', m: '0' }}
            labelPlacement="start"
            label="SSL Enable"
          />
        </Box>
        <Button
          disabled={
            !integrationData.smtpHost ||
            !integrationData.smtpUser ||
            !integrationData.smtpPass ||
            !integrationData.imapHost ||
            !integrationData.imapUser ||
            !integrationData.imapPass ||
            !integrationData.smtpPort ||
            !integrationData.imapPort ||
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
