import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CircularProgress, Button, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useImportContactsContext } from '../ImportContactsContext';

import { confirmImportCSV, uploadFieldPost } from '/src/services/contactsService';
import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setUpdateContacts: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TabFooter = ({ setUpdateContacts, setOpenModal }: Props) => {
  const { setImportCSVTabData, importCSVTabData } = useImportContactsContext();
  const { setOrganizationInfo, organizationInfo } = useOrganizationContext();

  const [isLoading, setIsLoading] = useState(false);

  const uploadField = async () => {
    setIsLoading(true);
    try {
      const { data } = await uploadFieldPost({
        mappings: importCSVTabData.step2.columnMappings.map(
          (item: { simulacrumType: string; originalName: string }) => {
            return { simulacrumType: item.simulacrumType, originalName: item.originalName };
          },
        ),
        importId: importCSVTabData.step1.importId,
      });
      setImportCSVTabData({
        ...importCSVTabData,
        step3: {
          ...importCSVTabData.step3,
          statuses: {
            duplicateRecords: data.data.duplicateRecords,
            invalidRecords: data.data.invalidRecords,
            validRecords: data.data.validRecords,
          },
        },
        step: importCSVTabData.step + 1,
      });
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const importCSVConfirm = async () => {
    setIsLoading(true);
    try {
      const {
        data: {
          data: { totalContactsCount },
        },
      } = await confirmImportCSV(importCSVTabData.step1.importId);
      setOrganizationInfo({ ...organizationInfo, contactsCount: totalContactsCount });
      toast.success('Success');
      setIsLoading(false);
      setUpdateContacts(true);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
      setIsLoading(false);
    }
  };

  const handleAction = async () => {
    try {
      if (importCSVTabData.step === 3) {
        await importCSVConfirm();
        return;
      }
      if (importCSVTabData.step === 2) {
        await uploadField();
        return;
      }
      if (importCSVTabData.step < 3) {
        setImportCSVTabData({ ...importCSVTabData, step: importCSVTabData.step + 1 });
      }
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const handlePrevious = () => {
    setImportCSVTabData({ ...importCSVTabData, step: importCSVTabData.step - 1 });
  };

  const canGoStep3 =
    importCSVTabData.step2.columnMappings &&
    importCSVTabData.step2.columnMappings.find(
      (element: { simulacrumType: string }) => element.simulacrumType === 'first_name',
    ) &&
    (importCSVTabData.step2.columnMappings.find(
      (element: { simulacrumType: string }) => element.simulacrumType === 'email',
    ) ||
      importCSVTabData.step2.columnMappings.find(
        (element: { simulacrumType: string }) => element.simulacrumType === 'phone',
      ));

  return (
    <Box sx={{ justifyContent: 'flex-end', display: 'flex', width: '100%', gap: '16px' }}>
      {importCSVTabData.step > 1 && (
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          onClick={handlePrevious}
          variant="contained"
          color="secondary"
          size="small"
        >
          Previous
        </Button>
      )}
      <Box sx={{ width: '130px' }}>
        <Button
          endIcon={
            isLoading ? (
              <CircularProgress sx={{ color: Colors.white }} size={20} />
            ) : importCSVTabData.step === 3 ? (
              <CheckIcon />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
          disabled={
            !importCSVTabData.step1.isFileUploaded ||
            isLoading ||
            (importCSVTabData.step === 2 && !canGoStep3)
          }
          onClick={handleAction}
          variant="contained"
          size="small"
        >
          {importCSVTabData.step === 3 ? 'Confirm' : 'Continue'}
        </Button>
      </Box>
    </Box>
  );
};
