import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import AbcIcon from '@mui/icons-material/Abc';
import PinIcon from '@mui/icons-material/Pin';
import React from 'react';

export const FieldTypesIcons = {
  checkbox: <CheckBoxOutlinedIcon sx={{ color: 'inherit' }} />,
  email: <AlternateEmailIcon sx={{ color: 'inherit' }} />,
  date: <CalendarMonthIcon sx={{ color: 'inherit' }} />,
  textarea: <SubtitlesIcon sx={{ color: 'inherit' }} />,
  number: <PinIcon sx={{ color: 'inherit' }} />,
  phone: <PinIcon sx={{ color: 'inherit' }} />,
  text: <AbcIcon sx={{ color: 'inherit' }} />,
};
