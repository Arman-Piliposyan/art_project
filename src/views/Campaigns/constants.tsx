import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import React from 'react';

export const CampaignSteps = [
  { icon: <PeopleAltOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Contacts' },
  { icon: <SettingsOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Configurations' },
  { icon: <AccountTreeOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Follow-Up' },
  { icon: <SettingsSuggestOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Executions' },
  { icon: <GridViewOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Overview' },
  { icon: <PlayCircleOutlineOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Playground' },
];

export const AnalyticsSteps = [
  { icon: <AnalyticsOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Pipeline' },
  { icon: <QueryStatsOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Report' },
  { icon: <QuestionAnswerOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Conversations' },
  { icon: <LocalPostOfficeOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Message' },
  { icon: <GridViewOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Overview' },
];
