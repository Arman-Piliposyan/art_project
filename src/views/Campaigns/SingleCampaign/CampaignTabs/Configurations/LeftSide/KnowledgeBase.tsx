import {
  SelectChangeEvent,
  FormHelperText,
  OutlinedInput,
  ListSubheader,
  FormControl,
  Typography,
  InputLabel,
  MenuItem,
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

export const KnowledgeBase = () => {
  const { setSingleCampaignData, configurationOptions, singleCampaignData } = useCampaignsContext();

  const [selectedField, setSelectedField] = useState<string[]>(singleCampaignData.step2.kbDocumentIds);
  const debouncedSelectedField = useDebouncedValue(selectedField);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedField(typeof value === 'string' ? value.split(',') : value);
  };

  useDidUpdate(() => {
    setSingleCampaignData({
      ...singleCampaignData,
      step2: { ...singleCampaignData.step2, kbDocumentIds: selectedField },
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
          Knowledge Base
        </Typography>
        <Tooltip title={'Description'}>
          <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
        </Tooltip>
      </Box>
      <Typography sx={{ color: Colors.titleColor, mb: '12px' }} fontSize={14}>
        Select a channel for your outreach messages.
      </Typography>

      <FormControl sx={{ width: '100%', my: '16px' }}>
        <InputLabel sx={{ top: !selectedField.length ? '-6px' : '0' }} id="multiple-chip-label">
          Choose a Knowledge Base
        </InputLabel>
        <Select
          renderValue={(selected) => {
            return (
              <Box
                sx={{
                  overflowY: 'scroll',
                  maxHeight: '80px',
                  flexWrap: 'wrap',
                  display: 'flex',
                  gap: 0.5,
                }}
              >
                {selected.map((value: string) => (
                  <Chip
                    label={
                      configurationOptions.documentsOptions.find((item: OptionsType) => item.value === value)
                        .label
                    }
                    size="small"
                    key={value}
                  />
                ))}
              </Box>
            );
          }}
          input={
            <OutlinedInput
              label="Choose a Knowledge Base"
              sx={{ p: '12px 8px 6px 8px' }}
              id="select-multiple-chip"
              minRows={1}
              maxRows={3}
              multiline
              fullWidth
            />
          }
          disabled={!configurationOptions.documentsOptions.length}
          labelId="multiple-chip-label"
          onChange={handleChange}
          MenuProps={MenuProps}
          value={selectedField}
          id="multiple-chip"
          multiple
        >
          {configurationOptions.documentsOptions.map((option: OptionsType) => {
            if (option.value === null) {
              return (
                <ListSubheader sx={{ color: Colors.simulacrumPrimary, fontWeight: '700' }} key={option.label}>
                  {option.label}
                </ListSubheader>
              );
            }
            return (
              <MenuItem sx={{ paddingLeft: '32px' }} value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
        {!configurationOptions.documentsOptions.length && (
          <FormHelperText sx={{ ml: '0' }}>Your knowledge base is empty</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
