import { Typography, Divider, Button, Box } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React from 'react';

import { useCampaignsContext } from '../CampaignsContext';
import { CampaignsTable } from './CampaignsTable';

import { Colors } from '/src/globalStyles/colors';

export const AllCampaigns = () => {
  const { setOpenModal } = useCampaignsContext();

  return (
    <>
      <Box
        sx={{ justifyContent: 'space-between', paddingBottom: '16px', alignItems: 'center', display: 'flex' }}
      >
        <Typography fontSize={22}>Campaigns</Typography>
        <Button
          onClick={() => setOpenModal(true)}
          endIcon={<AddOutlinedIcon />}
          sx={{ height: '42px' }}
          variant="contained"
          color="primary"
          size="small"
        >
          Create a New Campaigns
        </Button>
      </Box>
      <Divider
        sx={{
          borderColor: `${Colors.inputBorder}`,
          width: '100%',
          mb: '50px',
        }}
      />
      <Box
        sx={{
          height: 'calc(100% - 130px)',
          flexDirection: 'column',
          display: 'flex',
          width: '100%',
          gap: '32px',
        }}
      >
        <CampaignsTable />
      </Box>
    </>
  );
};
