import { DialogActions, DialogContent, Dialog } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { Button } from '@mui/material';
import React from 'react';

export const ErrorBoundaryModal = () => {
  return (
    <Dialog sx={{ marginLeft: 0 }} fullWidth={true} maxWidth="sm" open={true}>
      <DialogContent sx={{ padding: '16px' }}>
        Something went wrong, reload the page, click the "Refresh" button.
      </DialogContent>
      <DialogActions sx={{ padding: '16px' }}>
        <Button
          onClick={() => {
            window.location.reload();
          }}
          endIcon={<CachedIcon />}
          variant="contained"
          size="small"
        >
          Refresh
        </Button>
      </DialogActions>
    </Dialog>
  );
};
