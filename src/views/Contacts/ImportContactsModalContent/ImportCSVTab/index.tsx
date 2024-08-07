import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { useImportContactsContext } from '../ImportContactsContext';
import { TabContent } from './TabContent';
import { TabHeader } from './TabHeader';
import { TabFooter } from './TabFooter';

import { getContactDefaultFields, getCustomFieldsTypes } from '/src/services/contactsService';

type Props = {
  setUpdateContacts: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ImportCSVTab = ({ setUpdateContacts, setOpenModal }: Props) => {
  const { setCustomFieldsTypesOptions, setDefaultFieldsOptions, defaultFieldsOptions } =
    useImportContactsContext();

  const getOptions = async () => {
    try {
      const {
        data: { data },
      } = await getContactDefaultFields();
      setDefaultFieldsOptions(
        data.map((item: { label: string; key: string }) => {
          return { label: item.label, value: item.key };
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const customFieldTypes = async () => {
    try {
      const {
        data: { data },
      } = await getCustomFieldsTypes();
      setCustomFieldsTypesOptions(
        data.map((item: { label: string; key: string }) => {
          return { label: item.label, value: item.key };
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  useEffect(() => {
    if (defaultFieldsOptions.length) {
      return;
    }
    (async () => {
      await getOptions();
      customFieldTypes();
    })();
  }, []);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <TabHeader />
      <TabContent />
      <TabFooter setUpdateContacts={setUpdateContacts} setOpenModal={setOpenModal} />
    </Box>
  );
};
