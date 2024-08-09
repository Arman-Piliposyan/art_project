import React, { createContext, useContext, useState } from 'react';

type ConfigurationContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};

const ConfigurationContext = createContext({} as ConfigurationContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

const initialData = {
  reflectionColor: '',
  reflection: '',
  proportion: '',
  signColor: '',
  material: '',
  size: '',
};

export const ConfigurationContextProvider = ({ children }: Props): JSX.Element => {
  const [configurationData, setConfigurationData] = useState(initialData);
  const contextData = { setConfigurationData, configurationData };

  return <ConfigurationContext.Provider value={contextData}>{children}</ConfigurationContext.Provider>;
};

export const useConfigurationContext = () => {
  const contextData = useContext(ConfigurationContext);
  return contextData;
};
