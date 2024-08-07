import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Badge, Menu } from '@mui/material';
import React from 'react';

import { NotificationItem } from './NotificationItem';

import { Colors } from '/src/globalStyles/colors';

export interface INotification {
  // eslint-disable-next-line @typescript-eslint/ban-types
  notificationAction?: () => {};
  notificationTitle?: string;
  notificationText?: string;
  actionText?: string;
}

export const Notification = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications] = React.useState<INotification[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Badge badgeContent={notifications.length} sx={{ color: Colors.white }} showZero={false} color="error">
        <IconButton onClick={handleClick} size="small">
          <NotificationsIcon sx={{ height: '24px', width: '24px' }} />
        </IconButton>
      </Badge>
      {!!notifications.length && (
        <Menu
          slotProps={{
            paper: {
              sx: {
                boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.75);',
              },
              elevation: 0,
            },
          }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          onClose={handleClose}
          onClick={handleClose}
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
        >
          {notifications.map((notification, index) => {
            const { notificationAction, notificationTitle, notificationText, actionText } = notification;
            return (
              <NotificationItem
                notificationAction={notificationAction}
                notificationTitle={notificationTitle}
                notificationText={notificationText}
                actionText={actionText}
                key={index}
              />
            );
          })}
        </Menu>
      )}
    </>
  );
};
