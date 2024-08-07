import { CircularProgress, Typography, InputBase, TextField, MenuItem, Button, Box } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { ConversationType } from './types';

import { createTrain } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  selectedConversation: ConversationType | null;
};

export const TrainSection = ({ selectedConversation }: Props) => {
  const { id } = useParams();

  const [aiAnswer, setAiAnswer] = useState<string>('');
  const [correction, setCorrection] = useState<string>('');
  const [reflectionType, setReflectionType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectReflectionType = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setReflectionType(event.target.value);
  };

  const handleChangeAiAnswer = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAiAnswer(event.target.value);
  };

  const handleChangeCorrection = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCorrection(event.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await createTrain({
        campaignId: reflectionType === 'organization' ? null : id!,
        conversationId: selectedConversation?.id as string,
        userMessage: correction,
        aiMessage: aiAnswer,
      });
      setAiAnswer('');
      setCorrection('');
      setReflectionType('');
      setIsLoading(false);
      toast.success('Success');
    } catch (error) {
      toast.error('Fail');
      console.error(error);
    }
  };

  return (
    <Box sx={{ height: 'calc(100% - 50px)', p: '16px 0 6px 0', width: '100%' }}>
      <Box
        sx={{
          justifyContent: 'space-between',
          backgroundColor: 'white',
          flexDirection: 'column',
          p: '16px 16px 4px 16px',
          borderRadius: '6px',
          display: 'flex',
          height: '100%',
          width: '100%',
          gap: '4px',
        }}
      >
        <Typography sx={{ mb: '8px' }} fontWeight={500} align="center" fontSize={14}>
          Add Corrections
        </Typography>
        <Typography fontWeight={500} fontSize={12} align="left">
          Question
        </Typography>
        <InputBase
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            borderRadius: '6px',
            padding: '6px',
            width: '100%',
          }}
          onChange={handleChangeAiAnswer}
          value={aiAnswer}
          maxRows={3}
          minRows={3}
          multiline
        />

        <Typography sx={{ mt: '8px' }} fontWeight={500} fontSize={12} align="left">
          Model Answer
        </Typography>
        <Typography fontWeight={400} fontSize={10} align="left">
          Write the correct answer to the question raised
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
          maxRows={3}
          minRows={3}
          multiline
        />

        <Box sx={{ mt: '8px' }}>
          <TextField
            onChange={handleSelectReflectionType}
            label="Reflection Type"
            value={reflectionType}
            size="small"
            fullWidth
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
        </Box>

        <Button
          endIcon={
            isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <SaveOutlinedIcon />
          }
          disabled={isLoading || !aiAnswer || !correction || !reflectionType}
          sx={{ height: '40px', mt: '8px' }}
          onClick={handleSave}
          variant="contained"
          color="primary"
          size="small"
        >
          {'Save'}
        </Button>
      </Box>
    </Box>
  );
};
