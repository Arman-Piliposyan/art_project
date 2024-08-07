import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Typography, IconButton, Divider, Tooltip, Box } from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';

import { TrainItemType } from './type';

import { CommonDialog } from '/src/common/components/UI-Components/CommonDialog';
import { deleteTrain } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setSelectedTrain: React.Dispatch<React.SetStateAction<TrainItemType | null>>;
  setIsTrainsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  trainsData: TrainItemType[] | undefined;
};

export const TrainCenterContent = ({
  setIsTrainsChanged,
  setSelectedTrain,
  setOpenModal,
  trainsData,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [trainForDelete, setTrainForDelete] = useState<TrainItemType | null>(null);

  const handleOpenDialog = () => {
    if (isOpenDialog) {
      return;
    }
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (!isOpenDialog) {
      return;
    }
    setIsOpenDialog(false);
  };

  const handleDeleteTrain = async () => {
    setIsLoading(true);
    try {
      await deleteTrain(trainForDelete?.id as string);
      setIsLoading(false);
      setIsTrainsChanged(true);
      setIsOpenDialog(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          justifyContent: 'space-between',
          height: 'calc(100% - 80px)',
          alignContent: 'flex-start',
          flexWrap: 'wrap',
          display: 'flex',
          width: '100%',
          gap: '16px',
        }}
      >
        {trainsData!.map((train: TrainItemType) => {
          return (
            <Box
              sx={{ backgroundColor: Colors.paperBackgroundColor, height: '31%', width: '49%' }}
              key={train.id}
            >
              <Box
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  display: 'flex',
                  width: '100%',
                  p: '8px 20px',
                }}
              >
                <Tooltip title={train.aiMessage}>
                  <Typography
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      maxWidth: '450px',
                    }}
                    fontWeight={700}
                    fontSize={14}
                  >
                    {train.aiMessage}
                  </Typography>
                </Tooltip>
                <Box sx={{ alignItems: 'center', display: 'flex', gap: '12px' }}>
                  <Box
                    sx={{
                      backgroundColor: Colors.simulacrumPrimary,
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: 'white',
                      p: '4px 8px',
                    }}
                  >
                    {train.boundedTo}
                  </Box>
                  <IconButton
                    onClick={() => {
                      setTrainForDelete(train);
                      handleOpenDialog();
                    }}
                    sx={{
                      height: '18px',
                      width: '18px',
                    }}
                    disabled={isLoading}
                    disableRipple
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{
                        '&:hover': {
                          color: Colors.invalidRed,
                        },
                        cursor: 'pointer',
                      }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedTrain(train);
                    }}
                    sx={{
                      height: '18px',
                      width: '18px',
                    }}
                    disableRipple
                  >
                    <EditNoteOutlinedIcon
                      sx={{
                        '&:hover': {
                          color: Colors.simulacrumPrimary,
                        },
                        cursor: 'pointer',
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Divider
                sx={{
                  borderColor: `${Colors.simulacrumPrimary}`,
                  width: '100%',
                }}
              />
              <Tooltip title={train.userMessage}>
                <p className="train_ellipsis">{train.userMessage}</p>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
      {isOpenDialog && (
        <CommonDialog
          dialogContent={
            <Typography sx={{ wordWrap: ' break-word' }}>Are you sure you want to delete train</Typography>
          }
          handleCloseDialog={handleCloseDialog}
          confirmAction={handleDeleteTrain}
          confirmIcon={<DeleteIcon />}
          isOpenDialog={isOpenDialog}
          isLoading={isLoading}
          disabled={isLoading}
          buttonColor="error"
          confirmText="Yes"
          cancelText="No"
        />
      )}
    </>
  );
};
