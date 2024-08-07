import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { NavLink } from 'react-router-dom';
import React from 'react';

import styles from './app-drawer.module.scss';

type Props = {
  menuItem: { icon: ReactJSXElement; route: string; name: string; id: string };
  index: number;
  open: boolean;
};

export const ChildItem = ({ menuItem, open }: Props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        [styles.navItem, isActive ? styles.selectedNavItem : null].filter(Boolean).join(' ')
      }
      style={{ marginLeft: '40px' }}
      to={menuItem.route}
    >
      <ListItemButton
        sx={{
          justifyContent: open ? 'initial' : 'center',
          minHeight: 38,
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
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
          <Typography fontSize={12}>{menuItem.name}</Typography>
        </ListItemText>
      </ListItemButton>
    </NavLink>
  );
};
