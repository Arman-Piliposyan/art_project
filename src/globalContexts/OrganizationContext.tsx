import React, { createContext, useContext, useState } from 'react';

type CreateNodeContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};
const OrganizationContext = createContext({} as CreateNodeContextType);

interface UserInfo {
  organizationId: number;
  phoneNumber: string;
  createdOn: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  permissions: [];
  email: string;
  role: string;
  id: string;
}

interface OrganizationInfo {
  predefinedFlowActivationType: number;
  OrganizationId: string;
  TwilioStatus: boolean;
  contactsCount: number;
  CreatedAt: string;
  IsActive: boolean;
  Email: string;
  Phone: string;
  Name: string;
}

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const OrganizationContextProvider = ({ children }: Props): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo | null>(null);

  const contextData = {
    setOrganizationInfo,
    organizationInfo,
    setUserInfo,
    userInfo,
  };

  return <OrganizationContext.Provider value={contextData}>{children}</OrganizationContext.Provider>;
};

export const useOrganizationContext = () => {
  const contextData = useContext(OrganizationContext);
  return contextData;
};
