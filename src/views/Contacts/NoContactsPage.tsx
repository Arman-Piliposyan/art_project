import { Typography, Button, Box } from '@mui/material';
import React from 'react';

import { ContactsIcon } from '/src/assets';

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NoContactsPage = ({ setOpenModal }: Props) => {
  const handleOpenCreationPage = () => {
    setOpenModal(true);
  };

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
        <Typography fontSize={24}>You don't have any contacts</Typography>
        <Button onClick={handleOpenCreationPage} variant="contained" size="small">
          + Import Contacts
        </Button>
      </Box>
    </>
  );
};
