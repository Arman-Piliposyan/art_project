import { FormControlLabel, RadioGroup, Typography, TextField, MenuItem, Radio, Box } from '@mui/material';
import React from 'react';

import { UploadFileModalReflectionTypeOptions } from '../../contsants';
import { UploadFileModalDataType } from '../../type';
import { OptionsType } from '../..';

import { Colors } from '/src/globalStyles/colors';
import { StarsIcon } from '/src/assets';

type Props = {
  setModalData: React.Dispatch<React.SetStateAction<UploadFileModalDataType>>;
  campaignsOptions: OptionsType[] | undefined | [];
  modalData: UploadFileModalDataType;
};

export const ThirdStep = ({ campaignsOptions, setModalData, modalData }: Props) => {
  const handleChangeReflectionType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModalData({
      ...modalData,
      step3: {
        ...modalData.step3,
        campaignId: event.target.value === 'organization' ? '' : modalData.step3.campaignId,
        reflectionType: event.target.value,
      },
    });
  };

  const handleSelectCampaign = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setModalData({
      ...modalData,
      step3: {
        ...modalData.step3,
        campaignId: event.target.value,
      },
    });
  };

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: '16px',
      }}
    >
      <Box sx={{ backgroundColor: Colors.paperBackgroundColor, borderRadius: '8px', p: '16px' }}>
        <Typography fontWeight={500} align="center" fontSize={20}>
          Reflection Type
        </Typography>
        <Typography align="center" fontSize={14}>
          Choose how you want your uploaded content to be reflected in Simulacrum AI.
        </Typography>
      </Box>
      <RadioGroup
        sx={{ justifyContent: 'space-between', display: 'flex' }}
        value={modalData.step3.reflectionType}
        onChange={handleChangeReflectionType}
        row
      >
        {UploadFileModalReflectionTypeOptions.map(
          (option: { description: string; label: string; value: string }) => {
            return (
              <FormControlLabel
                label={
                  <>
                    <Box
                      sx={{
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        p: '16px',
                      }}
                    >
                      <StarsIcon />
                      <Typography fontWeight={500} align="center" fontSize={20}>
                        {option.label}
                      </Typography>
                      <Typography align="center" fontSize={14}>
                        {option.description}
                      </Typography>
                    </Box>
                    {option.value === 'campaign' && modalData.step3.reflectionType === 'campaign' && (
                      <TextField
                        sx={{ width: '100%', mt: '16px' }}
                        value={modalData.step3.campaignId}
                        onChange={handleSelectCampaign}
                        label="Choose the Campaign"
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
                  </>
                }
                sx={{
                  border:
                    modalData.step3.reflectionType === option.value
                      ? `1px solid ${Colors.simulacrumPrimary}`
                      : `1px solid ${Colors.inputBorder}`,
                  '& .MuiRadio-root': {
                    position: 'absolute',
                    right: '6px',
                    top: '6px',
                  },
                  '& .MuiFormControlLabel-label': {
                    height: '100%',
                    width: '100%',
                  },
                  transition: 'all 0.3s',
                  position: 'relative',
                  borderRadius: '8px',
                  height: '220px',
                  width: '375px',
                  margin: '0px',
                }}
                value={option.value}
                control={<Radio />}
                key={option.value}
              />
            );
          },
        )}
      </RadioGroup>
    </Box>
  );
};
