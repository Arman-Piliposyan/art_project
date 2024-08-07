import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import PsychologyIcon from '@mui/icons-material/Psychology';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { MarkerType, Position } from '@xyflow/react';
// import TuneIcon from '@mui/icons-material/Tune';
import SmsIcon from '@mui/icons-material/Sms';
import React from 'react';

import { Colors } from '/src/globalStyles/colors';

export const NODE_WIDTH = 300;
export const NODE_HEIGHT = 56;
export const ZOOM_OUT_LVL = 5;

export const initialNodes = [
  {
    sourcePosition: Position.Bottom,
    position: { x: 40, y: 40 },
    data: { label: 'Start' },
    isConnectable: false,
    type: 'startNode',
    id: '1',
  },
  {
    sourcePosition: Position.Bottom,
    position: { y: 176, x: 40 },
    type: 'addNode',
    data: {},
    id: '2',
  },
];

export const initialEdges = [
  {
    markerEnd: {
      color: Colors.simulacrumPrimary,
      type: MarkerType.ArrowClosed,
      height: 16,
      width: 16,
    },
    style: {
      stroke: '#FF0072',
      strokeWidth: 2,
    },
    animated: true,
    source: '1',
    target: '2',
    id: 'e1-2',
  },
];

export const Conditions = [
  // { title: 'Custom Condition', group: 'information', icon: <TuneIcon />, key: '1' },
  // {
  //   title: 'Dynamic Understanding',
  //   icon: <PsychologyIcon />,
  //   group: 'actions',
  //   key: '2',
  // },
  {
    icon: <AlternateEmailIcon />,
    title: 'Has email address',
    group: 'information',
    key: '3',
  },
  {
    title: 'Has phone number',
    icon: <LocalPhoneIcon />,
    group: 'information',
    key: '4',
  },
  {
    title: 'Phone Message seen',
    icon: <MarkChatReadIcon />,
    group: 'actions',
    key: '5',
  },
  {
    icon: <MarkEmailReadIcon />,
    title: 'Opened email',
    group: 'actions',
    key: '6',
  },
  {
    title: 'Clicked on link in email',
    icon: <AdsClickIcon />,
    group: 'actions',
    key: '7',
  },
  {
    title: 'Unsubscribe from email',
    icon: <UnsubscribeIcon />,
    group: 'actions',
    key: '8',
  },
  {
    title: 'Has Linkedin URL',
    icon: <LinkedInIcon />,
    group: 'information',
    key: '9',
  },
  {
    title: 'Accepted Linkedin Invit',
    icon: <BookmarkAddedIcon />,
    group: 'actions',
    key: '10',
  },
];

export const Actions = [
  {
    icon: <AlternateEmailIcon />,
    title: 'Email',
    key: '3',
  },
  {
    title: 'SMS Message',
    icon: <SmsIcon />,
    key: '4',
  },
  {
    title: 'Linkedin Message',
    icon: <LinkedInIcon />,
    key: '5',
  },
  {
    title: 'Linkedin Invitation',
    icon: <LinkedInIcon />,
    key: '6',
  },
  {
    title: 'Linkedin Visit Profile',
    icon: <LinkedInIcon />,
    key: '7',
  },
];
