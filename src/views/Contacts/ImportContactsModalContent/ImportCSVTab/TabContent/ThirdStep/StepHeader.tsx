import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import React from 'react';

import { useImportContactsContext } from '../../../ImportContactsContext';

import { Colors } from '/src/globalStyles/colors';

export const StepHeader = () => {
  const {
    importCSVTabData: {
      step3: { statuses },
    },
  } = useImportContactsContext();

  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        marginTop: '12px',
        display: 'flex',
        width: '100%',
        gap: '8px',
      }}
    >
      <Box
        sx={{
          backgroundColor: Colors.successGreen + 30,
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: '8px',
          display: 'flex',
          width: '30%',
          gap: '8px',
        }}
      >
        <DoneIcon sx={{ color: Colors.successGreen }} />
        <Typography fontWeight={600} align="center" fontSize={12}>
          {statuses.validRecords} Valid Contacts
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: Colors.warning + 30,
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: '8px',
          display: 'flex',
          width: '30%',
          gap: '8px',
        }}
      >
        <WarningAmberIcon sx={{ color: Colors.warning }} />
        <Typography fontWeight={600} fontSize={12}>
          {statuses.duplicateRecords} Duplicated Contacts
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: Colors.invalidRed + 30,
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: '8px',
          display: 'flex',
          width: '30%',
          gap: '8px',
        }}
      >
        <CloseIcon sx={{ color: Colors.invalidRed }} />
        <Typography fontWeight={600} fontSize={12}>
          {statuses.invalidRecords} Import Error
        </Typography>
      </Box>
    </Box>
  );
};
