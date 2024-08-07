/* eslint-disable @typescript-eslint/no-explicit-any */
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Skeleton, Box } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import List from '@mui/material/List';

import { ListItemWithoutChildren } from './ListItemWithoutChildren';
import { ListItemWithChildren } from './ListItemWithChildren';
import { NavigationStepper } from './NavigationStepper';
// import { ThemeSwitch } from '../UI-Components/ThemeSwitch';
import { ProfileDropdown } from '../ProfileDropdown';
import { ProPlanDrawerMenu } from './constants';
import { Notification } from '../Notification';

import { SimulacrumLogoAuth, SimulacrumSmLogo } from '/src/assets';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

const drawerWidth = 240;
const drawerMinWidth = 65;

type Props = {
  isLayoutLoading: boolean;
};

type DrawerMenuItemType = {
  children?: {
    icon: JSX.Element;
    route: string;
    name: string;
    id: string;
  }[];
  icon: JSX.Element;
  route: string;
  name: string;
  id: string;
};

const openedMixin = (theme: Theme): any => ({
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.sharp,
  }),
  overflowX: 'hidden',
  width: drawerWidth,
});

const closedMixin = (theme: any): any => ({
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  width: `calc(${theme.spacing(7)} + 1px)`,
  overflowX: 'hidden',
});

const DrawerHeader = styled('div')(({ theme, open }: any): any => ({
  justifyContent: open ? 'space-between' : 'center',
  padding: theme.spacing(0, 1.5),
  alignItems: 'center',
  display: 'flex',
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme, open }: any) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  zIndex: theme.zIndex.drawer + 1,
  ...(open
    ? {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      }
    : {
        width: `calc(100% - ${drawerMinWidth}px)`,
      }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop: any) => prop !== 'open',
})(({ theme, open }: any) => ({
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  width: drawerWidth,
  flexShrink: 0,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const AppDrawer = ({ isLayoutLoading }: Props) => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar
        sx={{ borderBottom: `0.5px solid ${Colors.lightGray}`, boxShadow: 'none' }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            backgroundColor: Colors.white,
            alignItems: 'center',
            display: 'flex',
            height: '55px',
            gap: '8px',
          }}
          variant="dense"
        >
          <NavigationStepper />
          <Box sx={{ display: 'flex' }}>
            <Notification />
            {/* TODO */}
            {/* <ThemeSwitch /> */}
            <ProfileDropdown />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer sx={{ '&>div': { backgroundColor: Colors.white } }} variant="permanent" open={open}>
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/* @ts-ignore*/}
        <DrawerHeader open={open}>{open ? <SimulacrumLogoAuth /> : <SimulacrumSmLogo />}</DrawerHeader>
        <Box>
          <Box sx={{ ...ScrollBarStylesGenerator('81vh'), paddingRight: '0px' }}>
            <List>
              {ProPlanDrawerMenu.map((menuItem: DrawerMenuItemType, index) => {
                if (isLayoutLoading) {
                  return (
                    <Skeleton
                      sx={{ marginBottom: '6px', marginLeft: '12px' }}
                      variant="rounded"
                      animation="wave"
                      key={index}
                      height={40}
                      width={40}
                    />
                  );
                }
                if (menuItem.children) {
                  return (
                    <ListItemWithChildren
                      menuItem={menuItem}
                      key={menuItem.id}
                      setOpen={setOpen}
                      index={index}
                      open={open}
                    />
                  );
                }
                return (
                  <ListItemWithoutChildren menuItem={menuItem} key={menuItem.id} index={index} open={open} />
                );
              })}
            </List>
          </Box>
        </Box>
        {isLayoutLoading ? (
          <Skeleton
            sx={{ marginBottom: '6px', marginLeft: '12px' }}
            variant="rounded"
            animation="wave"
            height={40}
            width={40}
          />
        ) : (
          <Box
            sx={{
              justifyContent: 'flex-end',
              margin: '8px 12px',
              display: 'flex',
            }}
          >
            <IconButton
              sx={{
                '&:hover': {
                  color: Colors.simulacrumPrimary,
                  backgroundColor: Colors.white,
                },
                border: `1px solid ${Colors.simulacrumPrimary}`,
                backgroundColor: Colors.simulacrumPrimary,
                transition: 'all 0.3s',
                borderRadius: '6px',
                color: Colors.white,
              }}
              onClick={handleDrawerToggle}
            >
              {open ? <ChevronLeftIcon color="inherit" /> : <ChevronRightIcon color="inherit" />}
            </IconButton>
          </Box>
        )}
      </Drawer>
    </>
  );
};
