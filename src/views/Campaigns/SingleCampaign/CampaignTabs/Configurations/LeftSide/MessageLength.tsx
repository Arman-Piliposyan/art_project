import { FormControlLabel, RadioGroup, Typography, Tooltip, Radio, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';

import { useCampaignsContext } from '/src/views/Campaigns/CampaignsContext';
import { OptionsType } from '/src/views/TrainCenter';
import { Colors } from '/src/globalStyles/colors';

export const MessageLength = () => {
  const { setSingleCampaignData, configurationOptions, singleCampaignData } = useCampaignsContext();

  const handleChangeMessageLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, messageLength: Number(event.target.value) },
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
          Message Length
        </Typography>
        <Tooltip title={'Description'}>
          <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
        </Tooltip>
      </Box>
      <Typography sx={{ color: Colors.titleColor, mb: '12px' }} fontSize={14}>
        Select a channel for your outreach messages.
      </Typography>
      <RadioGroup
        sx={{ justifyContent: 'space-between', display: 'flex' }}
        value={singleCampaignData.step2.messageLength}
        onChange={handleChangeMessageLength}
        row
      >
        {configurationOptions.messageLength.map((option: OptionsType) => {
          return (
            <FormControlLabel
              sx={{
                border:
                  singleCampaignData.step2.messageLength === option.value
                    ? `1px solid ${Colors.simulacrumPrimary}`
                    : `1px solid ${Colors.paperBackgroundColor}`,
                backgroundColor: Colors.paperBackgroundColor,
                transition: 'all 0.3s',
                borderRadius: '8px',
                margin: '0px',
                width: '31%',
              }}
              label={option.label}
              value={option.value}
              control={<Radio />}
              key={option.value}
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};
