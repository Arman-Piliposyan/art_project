import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Box } from '@mui/material';
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
  width?: number;
  height: number;
};

export const CustomSideBar = ({
  sideBarPosition = 'right',
  backgroundColor,
  toggleDrawer,
  width = 900,
  dataTestId,
  children,
  isOpen,
  height,
}: Props) => {
  return (
    <Box>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            transform: isOpen
              ? `translate(calc(50vw - ${width / 2}px), 0px) !important`
              : `translate(calc(50vw - ${width / 2}px), ${height}px) !important`,
            backgroundImage: backgroundColor ? 'none' : '',
            backgroundColor: backgroundColor,
            borderRadius: '8px 8px 0 0',
            height: `${height}px`,
            width: `${width}px`,
            minHeight: '350px',
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
    </Box>
  );
};
