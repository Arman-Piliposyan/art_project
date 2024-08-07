export interface IContactsColumn {
  id: 'first_name' | 'status' | 'email' | 'phone';
  align?: 'center' | 'right' | 'left';
  minWidth?: number;
  label: string;
}

export const contactsColumns: IContactsColumn[] = [
  { label: 'Phone', minWidth: 150, align: 'left', id: 'phone' },
  { label: 'First Name', id: 'first_name', minWidth: 210, align: 'left' },
  { label: 'Email', minWidth: 250, align: 'left', id: 'email' },
  {
    label: 'Status',
    minWidth: 200,
    align: 'left',
    id: 'status',
  },
];

export const tableCellEllipsisStyles = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: '180px',
  fontSize: '14px',
  padding: '12px',
  height: '30px',
};
