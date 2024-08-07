import { FormControlLabel, Typography, Button, Radio, Box } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useImportContactsContext } from '../../../../ImportContactsContext';
import { CardStatusStyles, CardStyles } from '../constants';

import { getSalesForceSignInUrl, syncSalesForce } from '/src/services/salesForceService';
import { AlternativeButtonWithBorderStyles } from '/src/constants';
import { importingSource } from '/src/views/Contacts/constants';
import { Colors } from '/src/globalStyles/colors';
import { SalesforceBlueLogo } from '/src/assets';

type Props = {
  setOpenBroadcastChannel: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SalesForceIntegrationCard = ({ setOpenBroadcastChannel }: Props) => {
  const { importCRMTabData } = useImportContactsContext();

  const [isLoading, setIsLoading] = useState(false);

  const isIntegrated = importCRMTabData.step1.isSalesForceIntegrated;

  const handleClick = async () => {
    setIsLoading(true);
    if (!isIntegrated) {
      try {
        const { data } = await getSalesForceSignInUrl();
        window.open(data, 'name', 'height=625,width=450');
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

  return (
    <Box
      sx={{
        ...CardStyles,
        borderColor:
          importCRMTabData.step1.selectedCRM === importingSource[2] ? Colors.simulacrumPrimary : '',
      }}
    >
      <Box sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%' }}>
        <FormControlLabel
          disabled={!importCRMTabData.step1.isSalesForceIntegrated}
          value={importingSource[2]}
          control={<Radio />}
          label=""
        />
        {!isIntegrated ? <Box sx={CardStatusStyles}>Not Connected</Box> : null}
      </Box>
      <SalesforceBlueLogo />

      <Box sx={{ height: '32px', width: '100%' }}>
        {!isIntegrated ? (
          <Button
            sx={AlternativeButtonWithBorderStyles}
            onClick={handleClick}
            disabled={isLoading}
            variant="contained"
            color="primary"
            size="small"
          >
            Connect
          </Button>
        ) : (
          <Typography fontWeight={600} align="center" fontSize={12}>
            Salesforce
          </Typography>
        )}
      </Box>
    </Box>
  );
};
