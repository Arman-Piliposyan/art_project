import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CircularProgress, Typography, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { CardStatusStyles, IntegrationType, CrdIconWrapper, CardStyles } from '../constants';

import { revokeOpenAiConnection } from '/src/services/openAi';
import { AlternativeButtonStyles } from '/src/constants';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setSelectedIntegrationIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  integrationItem: IntegrationType;
  getIntegrated: () => void;
  isIntegrated: boolean;
  index: number;
};

export const OpenAiIntegrationCard = ({
  setSelectedIntegrationIndex,
  setIsSidebarOpen,
  integrationItem,
  getIntegrated,
  isIntegrated,
  index,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsSidebarOpen(true);
    setSelectedIntegrationIndex(index);
  };

  const handleRevoke = async () => {
    setIsLoading(true);
    try {
      await revokeOpenAiConnection();
      await getIntegrated();
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
        <Box onClick={handleRevoke} sx={CardStatusStyles}>
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
