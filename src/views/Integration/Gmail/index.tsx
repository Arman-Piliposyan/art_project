import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CircularProgress, Typography, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { CardStatusStyles, IntegrationType, CrdIconWrapper, CardStyles } from '../constants';

import { getGmailSignInUrl, revokeGmail } from '/src/services/googleService';
import { AlternativeButtonStyles } from '/src/constants';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setOpenGmailBroadcastChannel: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGmailIntegrated: React.Dispatch<React.SetStateAction<boolean>>;
  integrationItem: IntegrationType;
  getIntegrated: () => void;
  isIntegrated: boolean;
};

export const GmailIntegrationCard = ({
  setOpenGmailBroadcastChannel,
  setIsGmailIntegrated,
  integrationItem,
  isIntegrated,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (!isIntegrated) {
      try {
        const { data } = await getGmailSignInUrl();
        window.open(data.url, 'name', 'height=650,width=680');
        setOpenGmailBroadcastChannel(true);
      } catch (error) {
        console.error(error);
        toast.error('Fail');
      } finally {
        setIsLoading(false);
      }
      return;
    }
  };

  const handleRevokeGmail = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await revokeGmail();
      setIsGmailIntegrated(false);
      toast.success('Success');
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={CardStyles}>
      <Box sx={CrdIconWrapper}>{integrationItem.icon}</Box>
      <Typography color={Colors.white} fontWeight={600} fontSize={14}>
        {integrationItem.name}
      </Typography>
      {isIntegrated ? (
        <Box onClick={handleRevokeGmail} sx={CardStatusStyles}>
          Revoke
        </Box>
      ) : null}
      <Typography color={Colors.white} fontWeight={300} fontSize={10}>
        {integrationItem.description}
      </Typography>
      <Button
        endIcon={
          isLoading ? (
            <CircularProgress sx={{ color: Colors.white }} size={20} />
          ) : isIntegrated ? null : (
            <KeyboardArrowRightIcon />
          )
        }
        disabled={isIntegrated || isLoading}
        sx={AlternativeButtonStyles}
        onClick={handleClick}
        variant="contained"
        color="primary"
        size="small"
      >
        {isIntegrated ? 'Integrated' : 'Integrate'}
      </Button>
    </Box>
  );
};
