import { ListItemButton, ListItemIcon, ListItemText, Typography, ListItem } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { NavLink } from 'react-router-dom';
import React from 'react';

import styles from './app-drawer.module.scss';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  menuItem: { icon: ReactJSXElement; route: string; name: string; id: string };
  index: number;
  open: boolean;
};

export const ListItemWithoutChildren = ({ menuItem, open }: Props) => {
  return (
    <ListItem sx={{ display: 'block', margin: '2px' }} key={menuItem.id} disablePadding>
      <NavLink
        className={({ isActive }) =>
          [styles.navItem, isActive ? styles.selectedNavItem : null].filter(Boolean).join(' ')
        }
        to={menuItem.route}
      >
        <ListItemButton
          sx={{
            padding: open ? '8px 2px 8px 16px !important' : '',
            justifyContent: open ? 'initial' : 'center',
            minHeight: '40px',
          }}
        >
          <ListItemIcon
            sx={{
              color: Colors.inputBorder,
              justifyContent: 'center',
              mr: open ? 3 : 'auto',
              minWidth: 0,
            }}
          >
            {menuItem.icon}
          </ListItemIcon>
          <ListItemText
            sx={{
              display: open ? 'block' : 'none',
              color: 'inherit',
              margin: '0',
            }}
          >
            <Typography fontSize={14}>{menuItem.name}</Typography>
          </ListItemText>
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};
