import { FormControlLabel, RadioGroup, Typography, TextField, Tooltip, Radio, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';

import { useCampaignsContext } from '/src/views/Campaigns/CampaignsContext';
import { useDebouncedValue } from '/src/hooks/useDebounce';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { OptionsType } from '/src/views/TrainCenter';
import { Colors } from '/src/globalStyles/colors';

export const Fallback = () => {
  const { setSingleCampaignData, configurationOptions, singleCampaignData } = useCampaignsContext();

  const [fallbackMessage, setFallbackMessage] = useState<string>(singleCampaignData.step2.fallbackMessage);

  const debouncedFallbackMessage = useDebouncedValue(fallbackMessage);

  const handleChangeFallbackMessage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFallbackMessage(event.target.value);
  };

  const handleChangeFallbackType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, fallbackType: Number(event.target.value) },
    });
  };

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, fallbackMessage },
    });
  }, [debouncedFallbackMessage]);

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
          Fallback
        </Typography>
        <Tooltip title={'Description'}>
          <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
        </Tooltip>
      </Box>
      <Typography sx={{ color: Colors.titleColor, mb: '12px' }} fontSize={14}>
        Select a channel for your outreach messages.
      </Typography>
      <RadioGroup
        value={singleCampaignData.step2.fallbackType}
        sx={{ display: 'flex', gap: '16px' }}
        onChange={handleChangeFallbackType}
        row
      >
        {configurationOptions.fallbackType.map((option: OptionsType) => {
          return (
            <FormControlLabel
              sx={{
                border:
                  singleCampaignData.step2.fallbackType === option.value
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
      {singleCampaignData.step2.fallbackType === 1 && (
        <TextField
          onChange={handleChangeFallbackMessage}
          value={fallbackMessage}
          variant="outlined"
          size="small"
          minRows={4}
          maxRows={4}
          multiline
        />
      )}
    </Box>
  );
};
