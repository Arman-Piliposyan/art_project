import { FormControlLabel, FormControl, RadioGroup, Typography, Radio } from '@mui/material';
import React from 'react';

import { useImportContactsContext } from '../../../ImportContactsContext';

import { Colors } from '/src/globalStyles/colors';

export const SecondStep = () => {
  const { setImportCRMTabData, importCRMTabData } = useImportContactsContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportCRMTabData({
      ...importCRMTabData,
      step2: { ...importCRMTabData.step2, viewType: Number((event.target as HTMLInputElement).value) },
    });
  };

  return (
    <FormControl>
      <Typography
        sx={{
          fontFamily: 'Poppins',
          color: Colors.black,
          fontWeight: '500',
          fontSize: '12px',
          mb: '16px',
        }}
      >
        Salesforce view to use to sync Salesforce leads or contacts
      </Typography>
      <RadioGroup value={importCRMTabData.step2.viewType} onChange={handleChange}>
        <FormControlLabel
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12px',
            mb: '16px',
            ml: '0px',
          }}
          label={<Typography fontSize={12}>Use LEAD view filters</Typography>}
          control={<Radio size="small" />}
          value={2}
        />
        <FormControlLabel
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            borderRadius: '6px',
            padding: '6px 12px',
            ml: '0px',
          }}
          label={<Typography fontSize={12}>Use CONTACT view filters</Typography>}
          control={<Radio size="small" />}
          value={1}
        />
      </RadioGroup>
    </FormControl>
  );
};
