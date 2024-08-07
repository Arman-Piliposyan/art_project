import { CircularProgress, Typography, Box } from '@mui/material';
import React from 'react';

import { useImportContactsContext } from '../ImportContactsContext';

import { Colors } from '/src/globalStyles/colors';

export const TabHeader = () => {
  const {
    importCSVTabData: { step },
  } = useImportContactsContext();

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${Colors.lightGray}`,
        padding: '0px 0px 16px 0px',
        display: 'flex',
        width: '100%',
        gap: '12px',
      }}
    >
      <Typography sx={{ width: '30px' }} fontWeight={500} align="right">
        {step}/3
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          sx={{ color: Colors.inputBorder + 50, position: 'absolute', top: '2px' }}
          variant="determinate"
          value={100}
          size={20}
        />
        <CircularProgress
          sx={{ color: Colors.successGreen, position: 'absolute', top: '2px' }}
          value={(step / 3) * 100}
          variant="determinate"
          size={20}
        />
      </Box>
      <Typography sx={{ ml: '24px' }} fontWeight={500}>
        {step === 1 ? 'Upload a CSV' : step === 2 ? 'Set up imported custom variables' : 'Manage Contacts'}
      </Typography>
    </Box>
  );
};
