import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from 'react';

import { IContactsColumn } from './types';

import { ImportCrmIcon, LinkedinIcon, CSVSmallIcon, ZapierIcon, APIIcon } from '/src/assets';
import { Colors } from '/src/globalStyles/colors';

export const tableRowCount = 10;

export const contactsColumns: IContactsColumn[] = [
  { label: 'First Name', id: 'first_name', minWidth: 150, align: 'left' },
  { label: 'Last Name', id: 'last_name', align: 'left', minWidth: 150 },
  { label: 'Email', minWidth: 150, align: 'left', id: 'email' },
  { label: 'Phone', minWidth: 150, align: 'left', id: 'phone' },
  { label: 'City', minWidth: 150, align: 'left', id: 'city' },
  {
    label: 'Country',
    id: 'country',
    minWidth: 150,
    align: 'left',
  },
];

export const tableTitleStyles = {
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  margin: '16px',
};

export const editIconStyles = {
  '&:hover': {
    color: Colors.simulacrumPrimary,
  },
  cursor: 'pointer',
};

export const deleteIconStyles = {
  '&:hover': {
    color: Colors.invalidRed,
  },
  cursor: 'pointer',
};

export const showIconStyles = {
  '&:hover': {
    color: Colors.successGreen,
  },
  cursor: 'pointer',
};

export const tableCellEllipsisStyles = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: '180px',
  fontSize: '14px',
  padding: '12px',
  height: '30px',
};

export const ImportContactsSteps = [
  { name: 'Import from CSV', icon: <CSVSmallIcon /> },
  { name: 'Import from CRM', icon: <ImportCrmIcon /> },
  { icon: <SearchOutlinedIcon sx={{ fontSize: '20px' }} />, name: 'Prospect Searcher' },
  { name: 'Import Leads from LinkedIn', icon: <LinkedinIcon /> },
  { name: 'Import from Zapier', icon: <ZapierIcon /> },
  { name: 'Import from API', icon: <APIIcon /> },
];

export enum importingSource {
  salesforce = 2,
  csv = 1,
}
