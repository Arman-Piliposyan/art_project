import { DialogActions, DialogContent, SvgIconProps, DialogTitle, Typography, Dialog } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { CircularProgress, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from 'react';

import { Colors } from '/src/globalStyles/colors';

interface Props {
  buttonColor?: 'secondary' | 'inherit' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  confirmIcon?: React.ReactElement<SvgIconProps> | null;
  dialogContent?: ReactNode | string;
  dialogActions?: ReactJSXElement;
  handleCloseDialog: () => void;
  confirmAction: () => void;
  isOpenDialog: boolean;
  errorMessage?: string;
  dialogTitle?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const errorMessageStyles = {
  color: Colors.invalidRed,
  position: 'absolute',
  fontSize: '10px',
  bottom: '8px',
  left: '8px',
};

export const CommonDialog = ({
  confirmIcon = null,
  errorMessage = '',
  handleCloseDialog,
  disabled = false,
  dialogContent,
  confirmAction,
  isOpenDialog,
  dialogTitle,
  buttonColor,
  confirmText,
  cancelText,
  isLoading,
}: Props) => {
  return (
    <Dialog sx={{ marginLeft: 0 }} open={isOpenDialog} fullWidth={true} maxWidth="sm">
      <DialogTitle sx={{ padding: '16px' }}>{dialogTitle}</DialogTitle>
      <DialogContent sx={{ padding: '16px' }}>{dialogContent}</DialogContent>
      <DialogActions sx={{ padding: '16px' }}>
        <Button
          endIcon={isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : confirmIcon}
          disabled={isLoading || disabled}
          onClick={confirmAction}
          color={buttonColor}
          variant="contained"
          size="small"
        >
          {confirmText}
        </Button>
        <Button
          onClick={handleCloseDialog}
          endIcon={<CloseIcon />}
          disabled={isLoading}
          variant="contained"
          color="secondary"
          size="small"
        >
          {cancelText}
        </Button>
      </DialogActions>
      <Typography sx={errorMessageStyles}>{errorMessage}</Typography>
    </Dialog>
  );
};
