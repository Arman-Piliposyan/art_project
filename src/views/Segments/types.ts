export type FieldDataType = {
  simulacrumType: string;
  label: string;
  name: string;
};

export type CriteriaTypeType = 'textarea' | 'checkbox' | 'number' | 'email' | 'phone' | 'text' | 'date' | '';

export type CriteriaDataType = {
  valueFrom: number | Date | null;
  valueTo: number | Date | null;
  conditionNum: number | null;
  type: CriteriaTypeType;
  label: string | null;
  name: string | null;
  value: string;
};

export type ConditionDataType = {
  applicableFor: string[];
  label: string;
  value: number;
};

export type SegmentDataType = {
  conditions: Omit<CriteriaDataType, 'label' | 'type'>[];
  name: string;
};

export type SegmentGetDataType = {
  isArchived: boolean;
  createdAt: string;
  segmentId: string;
  status: boolean;
  count: number;
  name: string;
};

export type SingleSegmentType = {
  conditions: Omit<CriteriaDataType, 'type'>[];
  contacts: ContactType[];
  isArchived: boolean;
  createdAt: string;
  name: string;
};

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
