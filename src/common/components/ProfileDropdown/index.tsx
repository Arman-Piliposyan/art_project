import { ListItemIcon, IconButton, Typography, MenuItem, Tooltip, Avatar, Menu } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import React from 'react';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
// import { getFlowInfo, resetFlow } from '/src/services/flowService';
// import TemplateContext from '/src/views/Template/TemplateContext';
import ApartmentIcon from '@mui/icons-material/Apartment';

import { logOut } from '/src/services/authService';
import { Colors } from '/src/globalStyles/colors';

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { organizationInfo } = useOrganizationContext();
  const refreshToken = localStorage.getItem('refreshToken');
  // const { setFlowInfo, setFlowData } = useContext(TemplateContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  // const handleOpenDialog = () => {
  //   setIsRecorderDialogOpen(true);
  // };

  const handleLogout = async () => {
    if (!token) {
      return;
    }
    await logOut(token, refreshToken);
    localStorage.clear();
    navigate('/login');
  };

  const handleOpenOrganization = () => {
    navigate('/organization');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
        {organizationInfo && (
          <Box>
            <Typography color={Colors.simulacrumPrimary} fontWeight={500} fontSize={12}>
              {organizationInfo.name}
            </Typography>
          </Box>
        )}
        <Tooltip title={'Account settings'}>
          <IconButton onClick={handleClick} size="small">
            <Avatar
              sx={{
                bgcolor: Colors.simulacrumPrimary,
                color: Colors.white,
                fontSize: '18px',
                height: 32,
                width: 32,
              }}
            >
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
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
        <MenuItem onClick={handleOpenOrganization}>
          <ListItemIcon>
            <ApartmentIcon fontSize="small" />
          </ListItemIcon>
          Organization
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
