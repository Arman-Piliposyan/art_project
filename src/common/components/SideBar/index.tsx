import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import React, { ReactNode } from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  sideBarPosition?: 'bottom' | 'right' | 'left' | 'top';
  toggleDrawer: () => void;
  backgroundColor?: string;
  children: ReactNode;
  dataTestId?: string;
  isOpen: boolean;
};

export const SideBar = ({
  sideBarPosition = 'right',
  backgroundColor,
  toggleDrawer,
  dataTestId,
  children,
  isOpen,
}: Props) => {
  return (
    <>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            backgroundImage: backgroundColor ? 'none' : '',
            backgroundColor: backgroundColor,
            minWidth: '350px',
          },
          position: 'relative',
          zIndex: '1202',
        }}
        anchor={sideBarPosition}
        open={isOpen}
      >
        <IconButton
          sx={{
            '&:hover': { color: Colors.invalidRed },
            position: 'absolute',
            height: '25px',
            width: '25px',
            right: '8px',
            zIndex: 1203,
            top: '8px',
          }}
          onClick={toggleDrawer}
        >
          <CloseIcon data-test-id={dataTestId} />
        </IconButton>
        {children}
      </Drawer>
    </>
  );
};
