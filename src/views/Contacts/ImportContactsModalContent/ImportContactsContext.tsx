import React, { createContext, useContext, useState } from 'react';

type ImportContactsContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};

const ImportContactsContext = createContext({} as ImportContactsContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const importCSVTabInitialData = {
  step3: {
    statuses: {
      duplicateRecords: null,
      invalidRecords: null,
      validRecords: null,
    },
  },
  step1: { isFileUploaded: false, totalRecords: null, importId: null, file: null },
  step2: { columnMappings: null },
  step: 1,
};

export const importCRMTabInitialData = {
  step4: {
    statuses: {
      duplicateRecords: null,
      invalidRecords: null,
      validRecords: null,
    },
  },
  step1: { isSalesForceIntegrated: null, selectedCRM: '' },
  step3: { columnMappings: null },
  step2: { viewType: null },
  importId: null,
  step: 1,
};

export const ImportContactsContextProvider = ({ children }: Props): JSX.Element => {
  const [tab, setTab] = useState('0');
  const [defaultFieldsOptions, setDefaultFieldsOptions] = useState([]);
  const [customFieldsTypesOptions, setCustomFieldsTypesOptions] = useState([]);
  const [importCSVTabData, setImportCSVTabData] = useState(importCSVTabInitialData);
  const [importCRMTabData, setImportCRMTabData] = useState(importCRMTabInitialData);

  const contextData = {
    setCustomFieldsTypesOptions,
    customFieldsTypesOptions,
    setDefaultFieldsOptions,
    defaultFieldsOptions,
    setImportCSVTabData,
    setImportCRMTabData,
    importCSVTabData,
    importCRMTabData,
    setTab,
    tab,
  };

  return <ImportContactsContext.Provider value={contextData}>{children}</ImportContactsContext.Provider>;
};

export const useImportContactsContext = () => {
  const contextData = useContext(ImportContactsContext);
  return contextData;
};
