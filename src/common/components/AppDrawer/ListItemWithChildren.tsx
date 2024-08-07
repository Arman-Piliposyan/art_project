import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItem,
  Collapse,
  List,
  Box,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './app-drawer.module.scss';
import { ChildItem } from './ChildItem';

interface Children {
  icon: ReactJSXElement;
  route: string;
  name: string;
  id: string;
}

type Props = {
  menuItem: {
    icon: ReactJSXElement;
    children?: Children[];
    route: string;
    name: string;
    id: string;
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  open: boolean;
};

export const ListItemWithChildren = ({ menuItem, setOpen, open }: Props) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const { pathname } = useLocation();

  const handleClick = () => {
    if (!open) {
      setOpen(true);
    }
    setCollapseOpen(!collapseOpen);
  };

  useEffect(() => {
    if (open) {
      if (pathname.includes(menuItem.route)) {
        setCollapseOpen(true);
      }
      return;
    }
    setCollapseOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <ListItem sx={{ display: 'block', margin: '2px' }} key={menuItem.id} disablePadding>
      <Box
        className={`${styles.collapseItemParent} ${
          !collapseOpen && pathname.includes(menuItem.route) && styles.selectedNavItem
        }`}
      >
        <ListItemButton
          sx={{
            padding: open ? '8px 2px 8px 16px !important' : '',
            justifyContent: open ? 'initial' : 'center',
            transition: 'all 0.3s',
            height: '40px',
          }}
          onClick={handleClick}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              mr: open ? 2 : 'auto',
              minWidth: 0,
            }}
          >
            {menuItem.icon}
          </ListItemIcon>
          <ListItemText
            sx={{
              '& span': {
                justifyContent: 'space-between',
                alignItems: 'center',
                display: 'flex',
              },
              display: open ? 'block' : 'none',
              color: 'inherit',
              width: '100%',
              margin: '0',
            }}
          >
            <Typography fontSize={14}>{menuItem.name}</Typography>
            {collapseOpen ? <ExpandLess sx={{ ml: 2 }} /> : <ExpandMore sx={{ ml: 2 }} />}
          </ListItemText>
        </ListItemButton>
      </Box>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menuItem.children?.map((child, index) => (
            <ChildItem menuItem={child} key={child.id} index={index} open={open} />
          ))}
        </List>
      </Collapse>
    </ListItem>
  );
};
