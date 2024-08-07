import { Box } from '@mui/material';
import React from 'react';

import { TabContent } from './TabContent';
import { TabHeader } from './TabHeader';
import { TabFooter } from './TabFooter';

type Props = {
  setUpdateContacts: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ImportCRMTab = ({ setUpdateContacts, setOpenModal }: Props) => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <TabHeader />
      <TabContent />
      <TabFooter setUpdateContacts={setUpdateContacts} setOpenModal={setOpenModal} />
    </Box>
  );
};
