import {
  SelectChangeEvent,
  FormControlLabel,
  OutlinedInput,
  FormControl,
  InputLabel,
  Typography,
  MenuItem,
  Checkbox,
  Tooltip,
  Select,
  Chip,
  Box,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';

import { useCampaignsContext } from '/src/views/Campaigns/CampaignsContext';
import { useDebouncedValue } from '/src/hooks/useDebounce';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { OptionsType } from '/src/views/TrainCenter';
import { Colors } from '/src/globalStyles/colors';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 16;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AIPersonalization = () => {
  const { setSingleCampaignData, configurationOptions, singleCampaignData } = useCampaignsContext();

  const [selectedField, setSelectedField] = useState<string[]>(singleCampaignData.step2.dynamicVariables);

  const debouncedSelectedField = useDebouncedValue(selectedField);

  const handleChange = (event: SelectChangeEvent<typeof selectedField>) => {
    const {
      target: { value },
    } = event;
    setSelectedField(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeUseHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, useChatHistory: event.target.checked },
    });
  };

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, dynamicVariables: selectedField },
    });
  }, [debouncedSelectedField]);

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
          AI Personalization
        </Typography>
        <Tooltip title={'Description'}>
          <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
        </Tooltip>
      </Box>
      <Typography sx={{ color: Colors.titleColor, mb: '12px' }} fontSize={14}>
        Select a channel for your outreach messages.
      </Typography>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="multiple-chip-label">Add Dynamic Variables</InputLabel>
        <Select
          renderValue={(selected) => (
            <Box sx={{ flexWrap: 'wrap', display: 'flex', gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip
                  label={
                    configurationOptions.fieldsOptions.find((option: OptionsType) => option.value === value)
                      .label
                  }
                  size="small"
                  key={value}
                />
              ))}
            </Box>
          )}
          input={<OutlinedInput label="Add Dynamic Variables" id="select-multiple-chip" fullWidth />}
          labelId="multiple-chip-label"
          onChange={handleChange}
          MenuProps={MenuProps}
          value={selectedField}
          id="multiple-chip"
          multiple
        >
          {configurationOptions.fieldsOptions.map((field: OptionsType) => (
            <MenuItem value={field.value} key={field.value}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox checked={singleCampaignData.step2.useChatHistory} onChange={handleChangeUseHistory} />
        }
        sx={{ width: 'max-content', marginLeft: '0px', mt: '16px' }}
        label="Consider the chat history if a previous chat exists."
      />
    </Box>
  );
};
