import { FormControlLabel, Typography, Radio, Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = { campaignType: string; description: string; icon: JSX.Element; label: string; value: string };

export const CampaignTypeItem = ({ campaignType, description, label, value, icon }: Props) => {
  return (
    <FormControlLabel
      label={
        <>
          <Box
            sx={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              width: '100%',
              p: '16px',
            }}
          >
            {icon}
            <Typography fontWeight={500} align="center" fontSize={16}>
              {label}
            </Typography>
            <Typography align="center" fontSize={14}>
              {description}
            </Typography>
          </Box>
        </>
      }
      sx={{
        border:
          campaignType === value
            ? `1px solid ${Colors.simulacrumPrimary}`
            : `1px solid ${Colors.inputBorder}`,
        '& .MuiRadio-root': {
          position: 'absolute',
          right: '6px',
          top: '6px',
        },
        '& .MuiFormControlLabel-label': {
          height: '100%',
          width: '100%',
        },
        transition: 'all 0.3s',
        position: 'relative',
        borderRadius: '8px',
        height: '180px',
        width: '375px',
        margin: '0px',
      }}
      control={<Radio />}
      value={value}
    />
  );
};
