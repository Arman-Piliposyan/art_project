import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import GroupsIcon from '@mui/icons-material/Groups';
import TuneIcon from '@mui/icons-material/Tune';
import SmsIcon from '@mui/icons-material/Sms';
import React from 'react';

export const ProPlanDrawerMenu = [
  {
    icon: <SpaceDashboardIcon sx={{ fontSize: '20px' }} />,
    route: '/dashboard',
    name: 'Dashboard',
    id: '1',
  },
  {
    icon: <ContactsIcon sx={{ fontSize: '20px' }} />,
    route: '/contacts',
    name: 'Contacts',
    id: '2',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: '20px' }} />,
    route: '/segments',
    name: 'Segments',
    id: '3',
  },
  {
    icon: <StorageIcon sx={{ fontSize: '20px' }} />,
    route: '/kb-management',
    name: 'KB Management',
    id: '4',
  },
  {
    icon: <QuestionAnswerIcon sx={{ fontSize: '20px' }} />,
    route: '/playground',
    name: 'Playground',
    id: '5',
  },
  {
    icon: <SmsIcon sx={{ fontSize: '20px' }} />,
    name: 'Train Center',
    route: '/train',
    id: '6',
  },
  {
    icon: <ApartmentIcon sx={{ fontSize: '20px' }} />,
    route: '/campaigns',
    name: 'Campaigns',
    id: '7',
  },
  {
    icon: <AccountTreeIcon sx={{ fontSize: '20px' }} />,
    route: '/follow-up builder',
    name: 'Follow-up Builder',
    id: '7.1',
  },
  {
    icon: <AssignmentIcon sx={{ fontSize: '20px' }} />,
    route: '/task',
    name: 'Task',
    id: '8',
  },
  {
    icon: <CloudSyncIcon sx={{ fontSize: '20px' }} />,
    route: '/integration',
    name: 'Integration',
    id: '9',
  },
  {
    icon: <PriceChangeIcon sx={{ fontSize: '20px' }} />,
    route: '/payment',
    name: 'Payment',
    id: '10',
  },
  {
    icon: <SettingsIcon sx={{ fontSize: '20px' }} />,
    route: '/settings',
    name: 'Settings',
    id: '11',
  },
];

export const StandardPlanDrawerMenu = [
  {
    icon: <StorageIcon sx={{ fontSize: '20px' }} />,
    route: '/kb-management',
    name: 'KB Management',
    id: '1',
  },
  {
    icon: <PriceChangeIcon sx={{ fontSize: '20px' }} />,
    route: '/payments',
    name: 'Payments',
    id: '2',
  },
  {
    icon: <CloudSyncIcon sx={{ fontSize: '20px' }} />,
    route: '/integration',
    name: 'Integration',
    id: '3',
  },
  {
    icon: <TuneIcon sx={{ fontSize: '20px' }} />,
    route: '/customize-widget',
    name: 'Customize Widget',
    id: '4',
  },
];
