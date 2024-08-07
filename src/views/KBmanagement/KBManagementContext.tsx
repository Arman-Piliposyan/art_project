import React, { createContext, useContext, useEffect, useState } from 'react';

import { IDocument, IFolder, ISubUrl } from './types';

type KBManagementContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};
const KBManagementContext = createContext({} as KBManagementContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const KBManagementContextProvider = ({ children }: Props): JSX.Element => {
  const [mineUrl, setMineUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [allDocuments, setAllDocuments] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [subUrls, setSubUrls] = useState<ISubUrl | null>(null);
  const [checkedOnlyOneUrl, setCheckedOnlyOneUrl] = useState(false);
  const [shownFile, setShownFile] = useState<IDocument | null>(null);
  const [knowledgeBaseUpdated, setKnowledgeBaseUpdated] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);

  useEffect(() => {
    if (openModal) {
      return;
    }
    if (selectedFolder) {
      setSelectedFolder(null);
    }
    if (files) {
      setFiles(null);
    }
    if (subUrls) {
      setSubUrls(null);
    }
    if (mineUrl) {
      setMineUrl('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const contextData = {
    setKnowledgeBaseUpdated,
    setCheckedOnlyOneUrl,
    knowledgeBaseUpdated,
    setSelectedFolder,
    checkedOnlyOneUrl,
    setAllDocuments,
    selectedFolder,
    setOpenModal,
    setShownFile,
    allDocuments,
    setMineUrl,
    setSubUrls,
    openModal,
    shownFile,
    setFiles,
    mineUrl,
    subUrls,
    files,
  };

  return <KBManagementContext.Provider value={contextData}>{children}</KBManagementContext.Provider>;
};

export const useKBManagementContext = () => {
  const contextData = useContext(KBManagementContext);
  return contextData;
};
