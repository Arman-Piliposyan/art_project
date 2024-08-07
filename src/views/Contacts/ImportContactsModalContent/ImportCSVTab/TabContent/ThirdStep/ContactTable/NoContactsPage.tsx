import { Typography, Box } from '@mui/material';
import React from 'react';

import { ContactsIcon } from '/src/assets';

export const NoContactsPage = ({ isSearch }: { isSearch: boolean }) => {
  return (
    <>
      <Box
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          width: '100%',
          gap: '16px',
        }}
      >
        <ContactsIcon />
        <Typography fontSize={24}>You don't have any contacts {isSearch && 'with your search'}</Typography>
      </Box>
    </>
  );
};
