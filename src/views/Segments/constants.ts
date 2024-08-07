export const conditionsValues = {
  doNotContain: 6,
  notBetween: 12,
  startsWith: 7,
  isNotEmpty: 5,
  between: 11,
  endsWith: 8,
  contains: 4,
  isEmpty: 2,
  after: 10,
  before: 9,
  isNot: 3,
  is: 1,
};

export const criteriaInitialData = {
  conditionNum: null,
  valueFrom: null,
  valueTo: null,
  label: null,
  name: null,
  value: '',
  type: '',
};

export enum Condition {
  Contains = 4,
  IsEmpty = 2,
  IsNot = 3,
  Is = 1,
}

import { IContactsColumn } from './types';

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
