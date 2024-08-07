import { CircularProgress, Typography, TextField, InputBase, MenuItem, Button, Box } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useCampaignsContext } from '../../../../CampaignsContext';
import { OptionsType } from '../../../../types';

import { generateMessagePreview } from '/src/services/campaignService';
import { Colors } from '/src/globalStyles/colors';

export const PreviewSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setPreviewSectionData, singleCampaignData, previewSectionData, contactTabData } =
    useCampaignsContext();

  const handleSelectContact = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPreviewSectionData({ contactId: event.target.value, messagePreview: '' });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { data } = await generateMessagePreview({
        contactId: previewSectionData.contactId,
        campaignId: singleCampaignData.id,
      });
      setPreviewSectionData({ ...previewSectionData, messagePreview: data });
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
        border: `1px solid ${Colors.simulacrumPrimary}`,
        backgroundColor: Colors.paperBackgroundColor,
        borderRadius: '8px',
        width: '100%',
        p: '12px',
      }}
    >
      <Typography sx={{ mb: '8px' }} fontWeight={500}>
        Generate Preview for Contact
      </Typography>
      <Typography sx={{ mb: '8px' }} fontSize={14}>
        Choose a contact to preview a sample message.
      </Typography>
      <Box sx={{ justifyContent: 'space-between', display: 'flex', width: '100%', gap: '12px' }}>
        <TextField
          helperText={
            (!singleCampaignData.step1.segmentId || !contactTabData?.segmentContacts?.length) &&
            'You need to select segment'
          }
          disabled={!contactTabData?.segmentContacts?.length || !singleCampaignData.step1.segmentId}
          value={previewSectionData?.contactId || ''}
          sx={{ width: 'calc(100% - 140px)' }}
          onChange={handleSelectContact}
          label="Contact"
          size="small"
          select
        >
          {!contactTabData?.segmentContacts?.length || !singleCampaignData.step1.segmentId ? (
            <MenuItem>None</MenuItem>
          ) : (
            contactTabData?.segmentContacts?.map((option: OptionsType) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))
          )}
        </TextField>
        <Button
          endIcon={
            isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <AutoAwesomeIcon />
          }
          disabled={!previewSectionData?.contactId || isLoading}
          onClick={handleGenerate}
          sx={{ height: '40px' }}
          variant="contained"
        >
          Generate
        </Button>
      </Box>
      <Box
        sx={{
          border: `1px solid ${Colors.inputBorder}`,
          borderRadius: '6px',
          padding: '16px',
          width: '100%',
          mt: '16px',
        }}
      >
        <Typography sx={{ mb: '12px' }} fontWeight={700}>
          To : <Typography component={'span'}>Generate Preview for Contact</Typography>
        </Typography>
        <Typography sx={{ mb: '6px' }} fontWeight={700}>
          First Message:
        </Typography>
        <InputBase
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            borderRadius: '6px',
            padding: '16px',
            width: '100%',
          }}
          value={previewSectionData?.messagePreview || ''}
          maxRows={3}
          minRows={3}
          multiline
          readOnly
        />
      </Box>
    </Box>
  );
};
