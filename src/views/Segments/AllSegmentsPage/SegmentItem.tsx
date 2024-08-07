import {
  CircularProgress,
  Typography,
  IconButton,
  MenuItem,
  Tooltip,
  Button,
  Menu,
  Box,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import { useSegmentsContext } from '../SegmentsContext';
import { SegmentGetDataType } from '../types';

import { CommonDialog } from '/src/common/components/UI-Components/CommonDialog';
import { deleteSegment, getSegment } from '/src/services/segmentService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  segment: SegmentGetDataType;
};

export const SegmentItem = ({ segment }: Props) => {
  const { setSingleSegmentData, setAllSegments, allSegments } = useSegmentsContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetSegment = async () => {
    setIsLoading(true);
    try {
      const { data } = await getSegment(segment.segmentId);
      setIsLoading(false);
      setSingleSegmentData(data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('Fail');
    }
  };

  const handleOpenDeleteDialog = () => {
    handleOpenDialog();
    handleClose();
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

  const handleDeleteSegment = async () => {
    setIsLoading(true);
    try {
      await deleteSegment(segment.segmentId);
      toast.success('Success');
      setIsLoading(false);
      handleCloseDialog();
      setAllSegments(allSegments.filter((item: SegmentGetDataType) => item.segmentId !== segment.segmentId));
    } catch (error) {
      console.error(error);
      toast.error('Fail');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: `0.5px solid ${Colors.lightGray}`,
          display: 'flex',
          width: '100%',
          my: '24px',
          pb: '24px',
        }}
      >
        <Box sx={{ width: '25%' }}>
          <Box
            sx={{ flexDirection: 'column', width: 'max-content', cursor: 'pointer', display: 'flex' }}
            onClick={handleGetSegment}
          >
            <Typography>{segment.name}</Typography>
            <Typography color={Colors.placeholderColor} fontSize={12}>
              {format(new Date(segment.createdAt), 'yyyy/MM/dd HH:MM')}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', width: '25%' }}>
          <Typography>{segment.status ? 'In Use' : 'Unused'}</Typography>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', width: '25%' }}>
          <Typography sx={{ paddingLeft: '24px' }}>{segment.count}</Typography>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', width: '25%', gap: '16px' }}>
          <Button
            endIcon={
              isLoading ? (
                <CircularProgress sx={{ color: Colors.white }} size={18} />
              ) : (
                <VisibilityOutlinedIcon />
              )
            }
            onClick={handleGetSegment}
            sx={{ height: '30px' }}
            disabled={isLoading}
            variant="contained"
            color="primary"
            size="small"
          >
            View
          </Button>
          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: Colors.inputBorder + 50,
                color: Colors.simulacrumPrimary,
              },
            }}
            onClick={handleClick}
            size="small"
          >
            <MoreHorizIcon sx={{ height: '24px', width: '24px' }} />
          </IconButton>
          <Menu
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            onClose={handleClose}
            anchorEl={anchorEl}
            id="basic-menu"
            open={open}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <Tooltip title={segment.status ? "You can't Delete segment in use" : ''}>
              <Box>
                <MenuItem onClick={handleOpenDeleteDialog} disabled={segment.status}>
                  Delete
                </MenuItem>
              </Box>
            </Tooltip>
          </Menu>
        </Box>
      </Box>
      {isOpenDialog && (
        <CommonDialog
          dialogContent={
            <Typography sx={{ wordWrap: ' break-word' }}>
              Are you sure you want to delete {segment.name} segment
            </Typography>
          }
          handleCloseDialog={handleCloseDialog}
          confirmAction={handleDeleteSegment}
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
