import { CircularProgress, Typography, InputBase, TextField, MenuItem, Button, Box } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { TrainItemType } from './type';
import { OptionsType } from '.';

import { createTrain, editTrain } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setIsTrainsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  campaignsOptions: OptionsType[] | undefined | [];
  selectedTrain: TrainItemType | null;
};

export const TrainModalContent = ({
  setIsTrainsChanged,
  campaignsOptions,
  selectedTrain,
  setOpenModal,
}: Props) => {
  const [aiAnswer, setAiAnswer] = useState<string>(selectedTrain?.aiMessage || '');
  const [correction, setCorrection] = useState<string>(selectedTrain?.userMessage || '');
  const [reflectionType, setReflectionType] = useState<string>(selectedTrain?.boundedTo || '');
  const [campaign, setCampaign] = useState<string>(selectedTrain?.campaignId || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangesAiAnswer = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAiAnswer(event.target.value);
  };

  const handleChangeCorrection = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCorrection(event.target.value);
  };

  const handleSelectReflectionType = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (campaign) {
      setCampaign('');
    }
    setReflectionType(event.target.value);
  };

  const handleSelectCampaign = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCampaign(event.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (!selectedTrain) {
        await createTrain({
          campaignId: campaign || null,
          userMessage: correction,
          conversationId: null,
          aiMessage: aiAnswer,
        });
      } else {
        await editTrain(
          {
            campaignId: campaign || null,
            userMessage: correction,
            conversationId: null,
            aiMessage: aiAnswer,
          },
          selectedTrain.id,
        );
      }
      setIsLoading(false);
      toast.success('Success');
      setIsTrainsChanged(true);
      setOpenModal(false);
    } catch (error) {
      toast.error('Fail');
      console.error(error);
    }
  };

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', width: '100%', gap: '16px', p: '16px' }}>
      {/* {selectedTrain && (
        <Box sx={{ borderBottom: `1px solid ${Colors.lightGray}`, pb: '16px' }}>
          <Button
            startIcon={<LaunchIcon />}
            //   onClick={() => setOpenModal(true)}
            sx={{ height: '40px' }}
            variant="contained"
            color="primary"
            size="small"
          >
            Go to the Chat
          </Button>
        </Box>
      )} */}
      <Box>
        <Typography sx={{ mb: '4px' }} fontWeight={700} fontSize={12}>
          AI Answer
        </Typography>
        <InputBase
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            borderRadius: '6px',
            padding: '6px',
            width: '100%',
          }}
          onChange={handleChangesAiAnswer}
          value={aiAnswer}
          maxRows={2}
          minRows={2}
          multiline
        />
      </Box>
      <Box>
        <Typography sx={{ mb: '4px' }} fontWeight={700} fontSize={12}>
          Correction
        </Typography>
        <InputBase
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            borderRadius: '6px',
            padding: '6px',
            width: '100%',
          }}
          onChange={handleChangeCorrection}
          value={correction}
          maxRows={5}
          minRows={5}
          multiline
        />
      </Box>
      <Box sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%' }}>
        <Box>
          <TextField
            onChange={handleSelectReflectionType}
            label="Reflection Type"
            sx={{ width: '200px' }}
            value={reflectionType}
            size="small"
            select
          >
            {[
              { label: 'Organization', value: 'organization' },
              { label: 'Campaign', value: 'campaign' },
            ].map((option: { label: string; value: string }) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {reflectionType === 'campaign' && (
            <TextField
              sx={{ width: '250px', ml: '16px' }}
              onChange={handleSelectCampaign}
              label="Choose the Campaign"
              value={campaign}
              size="small"
              select
            >
              {campaignsOptions!.map((option: { label: string; value: string }) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>
        <Button
          endIcon={
            isLoading ? (
              <CircularProgress sx={{ color: Colors.white }} size={20} />
            ) : selectedTrain ? (
              <EditIcon />
            ) : (
              <SaveOutlinedIcon />
            )
          }
          disabled={
            isLoading ||
            !aiAnswer ||
            !correction ||
            !reflectionType ||
            (reflectionType === 'campaign' && !campaign)
          }
          sx={{ height: '40px' }}
          onClick={handleSave}
          variant="contained"
          color="primary"
          size="small"
        >
          {selectedTrain ? 'Edit' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
};
