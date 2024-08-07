import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CircularProgress, Typography, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { CardStatusStyles, IntegrationType, CrdIconWrapper, CardStyles } from '../constants';

import { getSalesForceSignInUrl, revokeIntegration, syncSalesForce } from '/src/services/salesForceService';
import { AlternativeButtonStyles } from '/src/constants';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setIsSalesForceIntegrated: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenBroadcastChannel: React.Dispatch<React.SetStateAction<boolean>>;
  integrationItem: IntegrationType;
  getIntegrated: () => void;
  isIntegrated: boolean;
};

export const SalesForceIntegrationCard = ({
  setIsSalesForceIntegrated,
  setOpenBroadcastChannel,
  integrationItem,
  isIntegrated,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (!isIntegrated) {
      try {
        const { data } = await getSalesForceSignInUrl();
        window.open(data, 'name', 'height=650,width=680');
        setOpenBroadcastChannel(true);
      } catch (error) {
        console.error(error);
        toast.error('Fail');
      } finally {
        setIsLoading(false);
      }
      return;
    }
    try {
      await syncSalesForce();
      toast.success('Success');
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeSalesForce = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await revokeIntegration('salesforce');
      setIsSalesForceIntegrated(false);
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
        <Box onClick={handleRevokeSalesForce} sx={CardStatusStyles}>
          Revoke
        </Box>
      ) : null}
      <Typography color={Colors.white} fontWeight={300} fontSize={10}>
        {integrationItem.description}
      </Typography>
      <Button
        endIcon={
          isLoading ? (
            <CircularProgress sx={{ color: Colors.simulacrumPrimary }} size={20} />
          ) : (
            <KeyboardArrowRightIcon />
          )
        }
        sx={AlternativeButtonStyles}
        onClick={handleClick}
        disabled={isLoading}
        variant="contained"
        color="primary"
        size="small"
      >
        {isIntegrated ? 'Sync' : 'Integrate'}
      </Button>
    </Box>
  );
};
