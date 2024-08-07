import { CircularProgress, Typography, RadioGroup, TextField, Tooltip, Button, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useCampaignsContext } from '../CampaignsContext';
import { CampaignTypeItem } from './CampaignTypeItem';

import { createCampaignPost } from '/src/services/campaignService';
import { Colors } from '/src/globalStyles/colors';
import { StarsIcon } from '/src/assets';

export const CampaignCreationModalContent = () => {
  const { setOpenModal } = useCampaignsContext();
  const [isLoading, setIsLoading] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChangeCampaignName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignName(event.target.value);
  };

  const handleChangeCampaignType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignType(event.target.value);
  };

  const handleCreateCampaign = async () => {
    setIsLoading(true);
    try {
      const { data } = await createCampaignPost({ type: Number(campaignType), name: campaignName });
      toast.success('Success');
      setIsLoading(false);
      setOpenModal(false);
      navigate(`/campaigns/campaign/${data.id}`);
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.detail.message);
      }
      toast.error('Fail');
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', gap: '16px' }}>
      <Typography sx={{ p: '16px 16px 0 16px' }} fontWeight={500} fontSize={22}>
        New Campaign
      </Typography>
      <TextField
        sx={{ m: '0px 16px', width: '80%' }}
        onChange={handleChangeCampaignName}
        label="Campaign Name*"
        value={campaignName}
        autoComplete="off"
        helperText={error}
        error={!!error}
        size="small"
      />

      <RadioGroup
        sx={{
          backgroundColor: '#f8f8f8',
          flexDirection: 'column',
          display: 'flex',
          gap: '8px',
          p: '16px',
        }}
        onChange={handleChangeCampaignType}
        value={campaignType}
        row
      >
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <Typography sx={{ color: Colors.titleColor }} fontWeight={700}>
            Conversation
          </Typography>
          <Tooltip title={'Description'}>
            <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
          </Tooltip>
        </Box>
        <Typography fontSize={14}>AI will continue the conversation if your contact replies.</Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <CampaignTypeItem
            description="Create campaigns using one communication channel."
            label="Single Channel Conversation"
            campaignType={campaignType}
            icon={<StarsIcon />}
            value={'1'}
          />
          <CampaignTypeItem
            description="Create campaigns using multiple channels at the same time."
            label="Multichannel Conversation"
            campaignType={campaignType}
            icon={<StarsIcon />}
            value={'2'}
          />
        </Box>

        <Box sx={{ alignItems: 'center', display: 'flex', mt: '16px' }}>
          <Typography sx={{ color: Colors.titleColor }} fontWeight={700}>
            Single Message
          </Typography>
          <Tooltip title={'Description'}>
            <InfoIcon sx={{ color: Colors.titleColor, fontSize: '16px', ml: '8px' }} />
          </Tooltip>
        </Box>
        <Typography fontSize={14}>AI will create a task and notify you if your contact replies.</Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <CampaignTypeItem
            description="Create campaigns using one communication channel."
            campaignType={campaignType}
            label="Single Channel"
            icon={<StarsIcon />}
            value={'3'}
          />
          <CampaignTypeItem
            description="Create campaigns using multiple channels at the same time."
            campaignType={campaignType}
            label="Multichannel"
            icon={<StarsIcon />}
            value={'4'}
          />
        </Box>
      </RadioGroup>
      <Box sx={{ justifyContent: 'flex-end', p: '0px 16px 16px 16px', display: 'flex' }}>
        <Button
          endIcon={
            isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <AddCircleIcon />
          }
          disabled={!campaignName || isLoading || !campaignType}
          onClick={handleCreateCampaign}
          variant="contained"
          size="small"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};
