import { InputAdornment, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useImportContactsContext } from '../../../ImportContactsContext';
import { NoContactsPage } from './ContactTable/NoContactsPage';
import { ContactsTable } from './ContactTable';
import { StepHeader } from './StepHeader';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { getPreviewContacts } from '/src/services/contactsService';
import { useDebouncedValue } from '/src/hooks/useDebounce';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export type ContactType = {
  first_name: string;
  status: string;
  email: string;
  phone: string;
  id: string;
};

export type ContactsDataType = {
  items: ContactType[];
  currentPage: number;
  totalPages: number;
};

export const ThirdStep = () => {
  const {
    importCSVTabData: {
      step1: { importId },
    },
  } = useImportContactsContext();

  const [contactsData, setContactsData] = useState<ContactsDataType | null>(null);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearchValue = useDebouncedValue(searchValue);
  const debouncedPage = useDebouncedValue(page);

  const handleChangeSearchValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const getContacts = async () => {
    try {
      setIsTableLoading(true);
      const {
        data: { data },
      } = await getPreviewContacts({ searchValue, importId, page });
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
    (async () => {
      await getContacts();
    })();
  }, [debouncedPage]);

  useDidUpdate(() => {
    (async () => {
      if (page === 1) {
        await getContacts();
        return;
      }
      setPage(1);
    })();
  }, [debouncedSearchValue]);

  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      {isPageLoading ? (
        <LayoutLoader height="80px" />
      ) : (
        <>
          <StepHeader />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChangeSearchValue}
            value={searchValue}
            autoComplete="off"
            label="Search"
            size="small"
            fullWidth
          />
          <Box
            sx={{
              border: `1px solid ${Colors.placeholderColor}`,
              height: 'calc(100% - 160px)',
              borderRadius: '6px',
              padding: '4px',
            }}
          >
            <Box
              sx={{
                ...ScrollBarStylesGenerator('100%'),
              }}
            >
              {!contactsData || !contactsData.items.length ? (
                <NoContactsPage isSearch={!!searchValue} />
              ) : (
                <ContactsTable
                  isTableLoading={isTableLoading}
                  data={contactsData}
                  setPage={setPage}
                  page={page}
                />
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
