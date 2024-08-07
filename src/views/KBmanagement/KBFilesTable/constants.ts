import { IFilesColumn } from '../types';

import { Colors } from '/src/globalStyles/colors';

export const tableRowCount = 10;

export const contextColumns: IFilesColumn[] = [
  { id: 'fileRealName', label: 'Name', minWidth: 150, align: 'left' },
  { id: 'commitStatus', label: 'Status', align: 'center', minWidth: 150 },
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
  maxWidth: '550px',
  fontSize: '12px',
  padding: '8px',
  height: '28px',
};

export const contextsCreateEditFormWrapperStyles = {
  justifyContent: 'space-between',
  padding: '20px 10px 8px',
  flexDirection: 'column',
  display: 'flex',
  height: '100%',
  width: '350px',
};
