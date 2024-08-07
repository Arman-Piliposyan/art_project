import React, { createContext, useContext } from 'react';

type UserContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};

const UserContext = createContext({} as UserContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const UserContextProvider = ({ children }: Props): JSX.Element => {
  const contextData = {};

  return <UserContext.Provider value={contextData}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const contextData = useContext(UserContext);
  return contextData;
};
