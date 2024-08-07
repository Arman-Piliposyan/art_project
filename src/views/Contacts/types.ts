export interface IContactsColumn {
  id: 'first_name' | 'last_name' | 'country' | 'phone' | 'email' | 'city';
  align?: 'center' | 'right' | 'left';
  minWidth?: number;
  label: string;
}

export type ContactType = {
  first_name: string | null;
  last_name: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  id: string;
};

export type ContactsDataType = {
  items: ContactType[];
  currentPage: number;
  totalPages: number;
};
