import { CircularProgress, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import { TextFieldController } from '/src/common/components/UI-Components/TextFieldController';
import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { updateOrganizationInfo } from '/src/services/organizationService';
import { OrganizationSchema } from '/src/constants';
import { Colors } from '/src/globalStyles/colors';

interface IFormInputs {
  organizationName: string;
}

const Organization = () => {
  const { setOrganizationInfo, organizationInfo, userInfo } = useOrganizationContext();

  const [isLoading, setIsLoading] = useState(false);
  const [existingName, setExistingName] = useState('');

  const { handleSubmit, setError, control, watch } = useForm<IFormInputs>({
    defaultValues: { organizationName: organizationInfo.name },
    resolver: yupResolver(OrganizationSchema),
    mode: 'all',
  });

  const updateOrganization = async (updatedOrganizationData: IFormInputs) => {
    setIsLoading(true);
    try {
      await updateOrganizationInfo({
        name: updatedOrganizationData.organizationName,
        organizationId: userInfo.organizationId,
      });
      setExistingName('');
      setOrganizationInfo({
        ...organizationInfo,
        name: updatedOrganizationData.organizationName || '',
      });
      toast.success('Success');
    } catch (error) {
      toast.error('Fail');
      if (error.response.data.code === 'organization_already_exists_by_name') {
        setError('organizationName', {
          message: error.response.data.reason,
          type: 'invalid',
        });
        setExistingName(updatedOrganizationData.organizationName);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        // backgroundColor: Colors.mainBackgroundColor,
        padding: '24px 8px 8px',
        height: '100%',
        width: '100%',
      }}
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: '22px', height: '60px' }}>
        Organization {organizationInfo.name || ''}{' '}
        {organizationInfo.createdAt &&
          `CreatedAt ${format(new Date(organizationInfo.createdAt), 'MM/dd/yyyy')}`}
      </Typography>
      <Grid
        sx={{ height: 'calc(100% - 60px)' }}
        justifyContent="space-between"
        alignItems="flex-start"
        direction="column"
        container
      >
        <Grid container gap={4} item>
          <Grid sx={{ width: '30%' }}>
            <TextFieldController
              fieldName="organizationName"
              label="Organization Name"
              control={control}
              size="medium"
            />
          </Grid>
          <Grid sx={{ width: '30%' }}>
            <TextField value={organizationInfo.email || ''} disabled={true} label="Email" fullWidth />
          </Grid>
        </Grid>
        <Grid justifyContent="flex-end" container item>
          <Grid>
            <Button
              disabled={
                watch('organizationName') === organizationInfo.name ||
                watch('organizationName') === existingName ||
                isLoading
              }
              endIcon={
                isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <SaveAltIcon />
              }
              onClick={handleSubmit(updateOrganization)}
              variant="contained"
              fullWidth
            >
              Update organization
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Organization;
