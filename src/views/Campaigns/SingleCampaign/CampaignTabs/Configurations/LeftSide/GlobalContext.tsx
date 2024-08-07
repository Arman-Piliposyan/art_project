import { Typography, TextField, Tooltip, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';

import { useCampaignsContext } from '/src/views/Campaigns/CampaignsContext';
import { useDebouncedValue } from '/src/hooks/useDebounce';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { Colors } from '/src/globalStyles/colors';

export const GlobalContext = () => {
  const { setSingleCampaignData, singleCampaignData } = useCampaignsContext();

  const [globalContext, setGlobalContext] = useState<string>(singleCampaignData.step2.globalContext);

  const debouncedGlobalContext = useDebouncedValue(globalContext);

  const handleChangeGlobalContext = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setGlobalContext(event.target.value);
  };

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, globalContext },
    });
  }, [debouncedGlobalContext]);

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 6px -3px rgba(0, 0, 0, 0.25)',
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: '24px 16px',
        borderRadius: '6px',
        display: 'flex',
        width: '100%',
        gap: '8px',
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
        <Typography sx={{ color: Colors.titleColor }} fontWeight={700}>
          Global Context
        </Typography>
        <Tooltip title={'Description'}>
          <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
        </Tooltip>
      </Box>
      <Typography sx={{ color: Colors.titleColor, mb: '12px' }} fontSize={14}>
        Select a channel for your outreach messages.
      </Typography>
      <TextField
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#D9D9D9',
              borderWidth: '1px',
            },
          },
        }}
        onChange={handleChangeGlobalContext}
        value={globalContext}
        variant="outlined"
        size="small"
        minRows={6}
        maxRows={6}
        multiline
      />
    </Box>
  );
};
