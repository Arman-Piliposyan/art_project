import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box } from '@mui/material';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  withOutCloseIcon?: boolean;
  modalContent: JSX.Element;
  padding?: string;
  height?: string;
  width?: string;
  open: boolean;
};

const closeIconStyles = {
  '&:hover': {
    color: Colors.invalidRed,
  },
  color: Colors.inputBorder,
  position: 'absolute',
  cursor: 'pointer',
  right: '6px',
  top: '6px',
};

const wrapperStyle = {
  border: `1px solid ${Colors.inputBorder + 30}`,
  transform: 'translate(-50%, -50%)',
  position: 'absolute' as const,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  minWidth: '250px',
  maxWidth: '90vw',
  height: '90vh',
  boxShadow: 24,
  left: '50%',
  top: '50%',
};

export const CommonModal = ({
  withOutCloseIcon,
  setOpenModal,
  modalContent,
  padding,
  height,
  width,
  open,
}: Props) => {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      onClose={() => {
        return;
      }}
      open={open}
    >
      <Box sx={{ ...wrapperStyle, padding: padding || '24px', height: height, width: width }}>
        {!withOutCloseIcon && <CloseIcon onClick={handleClose} sx={closeIconStyles} />}
        {modalContent}
      </Box>
    </Modal>
  );
};
