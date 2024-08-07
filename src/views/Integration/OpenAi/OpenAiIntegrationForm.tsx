import { CircularProgress, Typography, TextField, Divider, Button, Box } from '@mui/material';
import DockIcon from '@mui/icons-material/Dock';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { connectOpenAi } from '/src/services/openAi';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  toggleSidebar: () => void;
  getIntegrated: () => void;
};

export const OpenAiIntegrationForm = ({ toggleSidebar, getIntegrated }: Props) => {
  const [openAiApiKey, setOpenAiApiKey] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeOpenAiApiKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenAiApiKey(event.target.value);
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectOpenAi(openAiApiKey);
      getIntegrated();
      setIsLoading(false);
      toggleSidebar();
      toast.success('Success');
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.detail.message);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '8px 24px', height: '100%' }}>
      <Typography fontSize={20}>OpenAI Integration</Typography>
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
            onChange={handleChangeOpenAiApiKey}
            label="OpenAi API Key*"
            value={openAiApiKey}
            autoComplete="off"
            size="small"
          />
        </Box>
        <Button
          startIcon={isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <DockIcon />}
          disabled={!openAiApiKey || isLoading}
          onClick={handleConnect}
          variant="contained"
        >
          Connect
        </Button>
      </Box>
    </Box>
  );
};
