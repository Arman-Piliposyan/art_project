import { Typography, MenuItem, Button, Box } from '@mui/material';
import React from 'react';

import { INotification } from '.';

import { Colors } from '/src/globalStyles/colors';

export const NotificationItem = ({
  notificationAction,
  notificationTitle,
  notificationText,
  actionText,
}: INotification) => {
  return (
    <MenuItem
      sx={{
        alignItems: 'flex-start',
        flexDirection: 'column',
        display: 'flex',
        width: '300px',
        gap: '8px',
      }}
    >
      {notificationTitle && (
        <Typography sx={{ fontWeight: 'bold', fontSize: '12px' }}>{notificationTitle}</Typography>
      )}
      {notificationText && (
        <Typography
          sx={{
            color: Colors.colorPrimary,
            whiteSpace: 'normal',
            fontSize: '10px',
          }}
        >
          {notificationText}
        </Typography>
      )}
      {notificationAction && actionText && (
        <Box sx={{ justifyContent: 'flex-end', display: 'flex', width: '100%' }}>
          <Button
            sx={{ fontSize: '12px', padding: 0 }}
            onClick={notificationAction}
            variant="contained"
            color="primary"
            size="small"
          >
            {actionText}
          </Button>
        </Box>
      )}
    </MenuItem>
  );
};
