import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { ImportContactsContextProvider } from './ImportContactsModalContent/ImportContactsContext';
import { ImportContactsModalContent } from './ImportContactsModalContent';
import { NoContactsPage } from './NoContactsPage';
import { ContactsTable } from './ContactsTable';
import { ContactsDataType } from './types';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { CommonModal } from '/src/common/components/UI-Components/CommonModal';
import { getAllContacts } from '/src/services/contactsService';
import { useDebouncedValue } from '/src/hooks/useDebounce';

const Contacts = () => {
  const [contactsData, setContactsData] = useState<ContactsDataType | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [updateContacts, setUpdateContacts] = useState(false);

  const debouncedPage = useDebouncedValue(page);

  const getContacts = async (currentPage = 1) => {
    if (currentPage === 0) {
      return;
    }
    try {
      setIsTableLoading(true);
      const { data } = await getAllContacts(currentPage);
      setPage(data.currentPage);
      setContactsData(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsTableLoading(false);
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    getContacts(page);
  }, [debouncedPage]);

  useEffect(() => {
    if (!updateContacts) {
      return;
    }
    (async () => {
      setPage(1);
      await getContacts(1);
      setUpdateContacts(false);
    })();
  }, [updateContacts]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {isPageLoading ? (
        <LayoutLoader height="80px" />
      ) : (
        <>
          <Box sx={{ height: '100%', width: '100%' }}>
            {!contactsData || !contactsData.items.length ? (
              <NoContactsPage setOpenModal={setOpenModal} />
            ) : (
              <ContactsTable
                isTableLoading={isTableLoading}
                setOpenModal={setOpenModal}
                data={contactsData}
                setPage={setPage}
                page={page}
              />
            )}
          </Box>
          <CommonModal
            modalContent={
              <ImportContactsContextProvider>
                <ImportContactsModalContent
                  setUpdateContacts={setUpdateContacts}
                  setOpenModal={setOpenModal}
                />
              </ImportContactsContextProvider>
            }
            setOpenModal={setOpenModal}
            open={openModal}
            height="90vh"
            width="90vw"
            padding="0"
          />
        </>
      )}
    </Box>
  );
};

export default Contacts;
