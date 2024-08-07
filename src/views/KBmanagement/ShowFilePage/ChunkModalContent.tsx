import { CircularProgress, Typography, TextField, Button, Box } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';

import { useKBManagementContext } from '../KBManagementContext';
import { IFileChunksData, IFileChunk } from '../types';

import { CommonDialog } from '/src/common/components/UI-Components/CommonDialog';
import { deleteChunk, editChunk } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setFileChunks: React.Dispatch<React.SetStateAction<IFileChunksData | null>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChunk: IFileChunk | null;
};

export const ChunkModalContent = ({ selectedChunk, setFileChunks, setOpenModal }: Props) => {
  const { shownFile } = useKBManagementContext();

  const [chunkText, setChunkText] = useState(selectedChunk?.content);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeChunkText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setChunkText(event.target.value);
  };

  const handleCloseDialog = () => {
    if (!isOpenDialog) {
      return;
    }
    setIsOpenDialog(false);
  };

  const handleOpenDialog = () => {
    if (isOpenDialog) {
      return;
    }
    setIsOpenDialog(true);
  };

  const handleEditChunk = async () => {
    setIsLoading(true);

    try {
      await editChunk({
        documentId: shownFile.documentId,
        id: selectedChunk?.id as string,
        content: chunkText as string,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setFileChunks((prev) => {
        const findChunkIndex = prev!.chunks.findIndex((chunk) => chunk.id === selectedChunk?.id);
        return {
          ...prev,
          chunks: [
            ...prev!.chunks.slice(0, findChunkIndex),
            {
              ...prev!.chunks[findChunkIndex],
              content: chunkText,
            },
            ...prev!.chunks.slice(findChunkIndex + 1),
          ],
        };
      });
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDeleteChunk = async () => {
    setIsLoading(true);
    try {
      await deleteChunk(selectedChunk?.id as string);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setFileChunks((prev) => {
        return { ...prev, chunks: prev!.chunks.filter((chunk) => chunk.id !== selectedChunk?.id) };
      });
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex',
        gap: '24px',
        p: '24px',
      }}
    >
      <TextField
        onChange={handleChangeChunkText}
        label="Chunk Text"
        variant="outlined"
        value={chunkText}
        size="small"
        minRows={14}
        maxRows={14}
        autoFocus
        multiline
      />
      <Box sx={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}>
        <Button
          endIcon={<DeleteOutlineIcon />}
          onClick={handleOpenDialog}
          sx={{ height: '32px' }}
          disabled={isLoading}
          variant="contained"
          color="error"
          size="small"
        >
          Delete
        </Button>
        <Box>
          <Button
            onClick={() => setOpenModal(false)}
            endIcon={<CancelOutlinedIcon />}
            sx={{ height: '32px' }}
            disabled={isLoading}
            variant="contained"
            color="secondary"
            size="small"
          >
            Cancel
          </Button>
          <Button
            endIcon={
              isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <SaveOutlinedIcon />
            }
            disabled={chunkText === selectedChunk?.content || isLoading}
            sx={{ height: '32px', ml: '16px' }}
            onClick={handleEditChunk}
            variant="contained"
            color="primary"
            size="small"
          >
            Save Changes
          </Button>
        </Box>
      </Box>
      {isOpenDialog && (
        <CommonDialog
          dialogContent={
            <Typography sx={{ wordWrap: ' break-word' }}>Are you sure you want to delete chunk</Typography>
          }
          handleCloseDialog={handleCloseDialog}
          confirmAction={handleDeleteChunk}
          confirmIcon={<DeleteIcon />}
          isOpenDialog={isOpenDialog}
          isLoading={isLoading}
          disabled={isLoading}
          buttonColor="error"
          confirmText="Yes"
          cancelText="No"
        />
      )}
    </Box>
  );
};
