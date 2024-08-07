import { Typography, TextField, MenuItem, Tooltip, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';

import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { useCampaignsContext } from '/src/views/Campaigns/CampaignsContext';
import { OptionsType } from '/src/views/Campaigns/types';
import { Colors } from '/src/globalStyles/colors';

export const Channel = () => {
  const { organizationInfo } = useOrganizationContext();

  const {
    configurationOptions: { channel },
    setSingleCampaignData,
    singleCampaignData,
  } = useCampaignsContext();

  const handleSelectChannel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, channel: event.target.value },
    });
  };

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
          Choose your Channel
        </Typography>
        <Tooltip title={'Description'}>
          <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
        </Tooltip>
      </Box>
      <Typography sx={{ color: Colors.titleColor, mb: '12px' }} fontSize={14}>
        Select a channel for your outreach messages.
      </Typography>

      <TextField
        value={singleCampaignData.step2.channel}
        onChange={handleSelectChannel}
        sx={{ width: '60%' }}
        label="Channel"
        size="small"
        select
      >
        {channel.map((option: OptionsType) => (
          <MenuItem disabled={option.value === 1 ? false : true} value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          gap: '12px',
          pl: '8px',
        }}
      >
        <Box
          sx={{
            boxShadow: `0px 0px 10px 3px ${
              organizationInfo.TwilioStatus ? `${Colors.successGreen + 80}` : `${Colors.invalidRed + 80}`
            }`,
            backgroundColor: `${organizationInfo.TwilioStatus ? Colors.successGreen : Colors.invalidRed}`,
            borderRadius: '50%',
            height: '10px',
            width: '10px',
          }}
        ></Box>
        <Typography align="center">
          Your account{' '}
          <Typography component={'span'} fontWeight={500} align="center">
            {organizationInfo.Phone}
          </Typography>{' '}
          {organizationInfo.TwilioStatus ? 'is active' : 'is not active'}
        </Typography>
      </Box>
    </Box>
  );
};
