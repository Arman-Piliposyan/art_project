import { Typography, IconButton, MenuItem, Switch, Menu, Box } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { format } from 'date-fns';

import { CampaignStatusEnum, CampaignDataType } from '../types';
import { useCampaignsContext } from '../CampaignsContext';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  campaign: CampaignDataType;
};

export const CampaignRow = ({ campaign }: Props) => {
  const { setSelectedCampaignAnalytics, setStep } = useCampaignsContext();

  const [checked, setChecked] = useState(campaign.isActive);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleGoCampaignConfigurationPage = () => {
    navigate(`/campaigns/campaign/${campaign.id}`);
  };

  const handleGoCampaignAnalyticsPage = () => {
    setSelectedCampaignAnalytics(campaign);
    navigate(`/campaigns/analytics/${campaign.id}`);
  };

  const campaignStatusCell = (status: CampaignStatusEnum) => {
    switch (status) {
      case CampaignStatusEnum.Draft:
        return (
          <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
            <CreateOutlinedIcon sx={{ color: Colors.simulacrumPrimary, fontSize: '20px' }} />
            <Typography>{CampaignStatusEnum[status]}</Typography>
          </Box>
        );
      case CampaignStatusEnum.Scheduled:
        return (
          <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
            <CalendarMonthOutlinedIcon sx={{ color: Colors.simulacrumPrimary, fontSize: '20px' }} />
            <Typography>{CampaignStatusEnum[status]}</Typography>
          </Box>
        );
      case CampaignStatusEnum.OnHold:
        return (
          <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
            <LoopOutlinedIcon sx={{ color: Colors.simulacrumPrimary, fontSize: '24px' }} />
            <Typography>{CampaignStatusEnum[status]}</Typography>
          </Box>
        );
      case CampaignStatusEnum.Running:
        return (
          <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
            <Box
              sx={{
                boxShadow: `0px 0px 10px 1px ${Colors.successGreen}`,
                backgroundColor: Colors.successGreen,
                borderRadius: '50%',
                height: '10px',
                width: '10px',
              }}
            ></Box>
            <Typography>{CampaignStatusEnum[status]}</Typography>
          </Box>
        );
      case CampaignStatusEnum.Completed:
        return (
          <Box sx={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
            <TaskAltOutlinedIcon sx={{ color: Colors.successGreen, fontSize: '20px' }} />
            <Typography>{CampaignStatusEnum[status]}</Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ borderBottom: `0.5px solid ${Colors.lightGray}`, display: 'flex', width: '100%', py: '12px' }}>
      <Box sx={{ alignItems: 'center', display: 'flex', width: '5%', pl: '4px' }}>
        <Typography>
          <Switch inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} checked={checked} />
        </Typography>
      </Box>
      <Box
        sx={{ flexDirection: 'column', cursor: 'pointer', display: 'flex', width: '20%', pl: '16px' }}
        onClick={handleGoCampaignConfigurationPage}
      >
        <Typography>{campaign.name}</Typography>
        <Typography color={Colors.simulacrumSecondary} fontSize={12}>
          {format(new Date(campaign.createdAt), 'LLLL dd, yyyy HH:mm')}
        </Typography>
      </Box>
      <Box sx={{ alignItems: 'center', display: 'flex', width: '20%' }}>
        <Typography>{campaign.type}</Typography>
      </Box>
      <Box sx={{ alignItems: 'center', display: 'flex', width: '15%' }}>
        <Typography sx={{ pl: '64px' }}>{campaign.completedLeads}</Typography>
      </Box>
      <Box sx={{ alignItems: 'center', display: 'flex', width: '15%' }}>
        <Typography>{campaign.sender}</Typography>
      </Box>
      <Box sx={{ alignItems: 'center', display: 'flex', width: '15%' }}>
        <Box>{campaignStatusCell(4)}</Box>
      </Box>
      <Box sx={{ alignItems: 'center', display: 'flex', width: '10%', gap: '16px' }}>
        <IconButton
          sx={{
            '&:hover': {
              backgroundColor: Colors.inputBorder + 50,
              color: Colors.simulacrumPrimary,
            },
          }}
          onClick={handleGoCampaignAnalyticsPage}
          size="small"
        >
          <BarChartIcon sx={{ height: '24px', width: '24px' }} />
        </IconButton>
        <IconButton
          sx={{
            '&:hover': {
              backgroundColor: Colors.inputBorder + 50,
              color: Colors.simulacrumPrimary,
            },
          }}
          onClick={handleClick}
          size="small"
        >
          <MoreHorizIcon sx={{ height: '24px', width: '24px' }} />
        </IconButton>
        <Menu
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          onClose={handleClose}
          anchorEl={anchorEl}
          id="basic-menu"
          open={open}
        >
          <MenuItem onClick={handleClose}>Archive</MenuItem>
          <MenuItem onClick={handleGoCampaignConfigurationPage}>Campaign Settings</MenuItem>
          <MenuItem
            onClick={() => {
              setStep('1');
              handleGoCampaignConfigurationPage();
            }}
          >
            Lead List
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
