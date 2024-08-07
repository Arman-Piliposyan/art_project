import {
  FormControlLabel,
  Typography,
  RadioGroup,
  Checkbox,
  Tooltip,
  Slider,
  Radio,
  Box,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';

import { useCampaignsContext } from '/src/views/Campaigns/CampaignsContext';
import { useDebouncedValue } from '/src/hooks/useDebounce';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { OptionsType } from '/src/views/TrainCenter';
import { Colors } from '/src/globalStyles/colors';

export const MessageTone = () => {
  const { setSingleCampaignData, configurationOptions, singleCampaignData } = useCampaignsContext();

  const [creativityLevel, setCreativityLevel] = useState<number[] | number>(
    singleCampaignData.step2.creativityLevel,
  );

  const debouncedCreativityLevel = useDebouncedValue(creativityLevel);

  const handleChangeMessageTone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, conversationMessageTone: Number(event.target.value) },
    });
  };

  const handleChangeUseEmoji = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, useEmoji: event.target.checked },
    });
  };

  const handleChangeCreativityLevel = (_: Event, newValue: number[] | number) => {
    setCreativityLevel(newValue);
  };

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, creativityLevel },
    });
  }, [debouncedCreativityLevel]);

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
          Message Tone
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
        value={singleCampaignData.step2.conversationMessageTone}
        onChange={handleChangeMessageTone}
        row
      >
        {configurationOptions.conversationMessageTone.map((option: OptionsType) => {
          return (
            <FormControlLabel
              sx={{
                border:
                  singleCampaignData.step2.conversationMessageTone === option.value
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

      <FormControlLabel
        control={<Checkbox checked={singleCampaignData.step2.useEmoji} onChange={handleChangeUseEmoji} />}
        sx={{ margin: '8px 0px 8px', width: 'max-content' }}
        label="Include emojis in messages."
      />

      <Box sx={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
        <Box sx={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography> Creativity level</Typography>
            <Tooltip title={'Description'}>
              <InfoIcon sx={{ color: Colors.titleColor, fontSize: '14px', ml: '6px' }} />
            </Tooltip>
          </Box>
          <Typography sx={{ mb: '8px' }} fontWeight={500}>
            {creativityLevel}
          </Typography>
        </Box>
        <Slider
          marks={[
            {
              label: '0',
              value: 0,
            },
            {
              label: '1',
              value: 1,
            },
          ]}
          onChange={handleChangeCreativityLevel}
          value={creativityLevel}
          sx={{ width: '99%' }}
          size="small"
          step={0.1}
          max={1}
          min={0}
        />
      </Box>
    </Box>
  );
};
