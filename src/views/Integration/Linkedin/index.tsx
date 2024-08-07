import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CircularProgress, Typography, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { CardStatusStyles, IntegrationType, CrdIconWrapper, CardStyles } from '../constants';

import { getLinkedinSignInUrl, revokeLinkedin } from '/src/services/linkedinService';
import { AlternativeButtonStyles } from '/src/constants';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setIsLinkedinIntegrated: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLinkedinChannel: React.Dispatch<React.SetStateAction<boolean>>;
  integrationItem: IntegrationType;
  getIntegrated: () => void;
  isIntegrated: boolean;
};

export const Linkedin = ({
  setIsLinkedinIntegrated,
  setOpenLinkedinChannel,
  integrationItem,
  isIntegrated,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (!isIntegrated) {
      try {
        const { data } = await getLinkedinSignInUrl();
        window.open(data.url, 'name', 'height=650,width=680');
        setOpenLinkedinChannel(true);
      } catch (error) {
        console.error(error);
        toast.error('Fail');
      } finally {
        setIsLoading(false);
      }
      return;
    }
  };

  const handleRevokeLinkedin = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await revokeLinkedin();
      setIsLinkedinIntegrated(false);
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
        <Box onClick={handleRevokeLinkedin} sx={CardStatusStyles}>
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
