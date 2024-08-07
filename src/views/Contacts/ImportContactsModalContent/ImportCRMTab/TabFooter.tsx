import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CircularProgress, Button, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useImportContactsContext } from '../ImportContactsContext';

import { chooseImportingViewType, initImportingSource } from '/src/services/salesForceService';
import { confirmImportCSV, uploadFieldPost } from '/src/services/contactsService';
import { useOrganizationContext } from '/src/globalContexts/OrganizationContext';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setUpdateContacts: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TabFooter = ({ setUpdateContacts, setOpenModal }: Props) => {
  const { setImportCRMTabData, importCRMTabData } = useImportContactsContext();
  const { setOrganizationInfo, organizationInfo } = useOrganizationContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleInitImportingSource = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await initImportingSource(importCRMTabData.step1.selectedCRM);
      setImportCRMTabData({
        ...importCRMTabData,
        step: importCRMTabData.step + 1,
        importId: data.importId,
      });
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadField = async () => {
    setIsLoading(true);
    try {
      const { data } = await uploadFieldPost({
        mappings: importCRMTabData.step3.columnMappings.map(
          (item: { simulacrumType: string; originalName: string }) => {
            return { simulacrumType: item.simulacrumType, originalName: item.originalName };
          },
        ),
        importId: importCRMTabData.importId,
      });
      setImportCRMTabData({
        ...importCRMTabData,
        step4: {
          ...importCRMTabData.step4,
          statuses: {
            duplicateRecords: data.data.duplicateRecords,
            invalidRecords: data.data.invalidRecords,
            validRecords: data.data.validRecords,
          },
        },
        step: importCRMTabData.step + 1,
      });
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChooseImportingViewType = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await chooseImportingViewType({
        viewType: importCRMTabData.step2.viewType,
        importId: importCRMTabData.importId,
      });
      setImportCRMTabData({
        ...importCRMTabData,
        step3: { ...importCRMTabData.step3, columnMappings: data.columnMappings },
        step: importCRMTabData.step + 1,
      });
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        toast.error(error.response.data.reason);
        return;
      }
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const importCRMConfirm = async () => {
    setIsLoading(true);
    try {
      const {
        data: {
          data: { totalContactsCount },
        },
      } = await confirmImportCSV(importCRMTabData.importId);
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
    if (importCRMTabData.step === 1) {
      await handleInitImportingSource();
      return;
    }
    if (importCRMTabData.step === 2) {
      await handleChooseImportingViewType();
      return;
    }
    if (importCRMTabData.step === 3) {
      await uploadField();
      return;
    }
    if (importCRMTabData.step === 4) {
      await importCRMConfirm();
      return;
    }
  };

  const handlePrevious = () => {
    setImportCRMTabData({ ...importCRMTabData, step: importCRMTabData.step - 1 });
  };

  return (
    <Box sx={{ justifyContent: 'flex-end', display: 'flex', width: '100%', gap: '16px' }}>
      {importCRMTabData.step > 1 && (
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
          disabled={
            (importCRMTabData.step === 1 && !importCRMTabData.step1.selectedCRM) ||
            (importCRMTabData.step === 2 && !importCRMTabData.step2.viewType) ||
            isLoading ||
            (importCRMTabData.step === 4 && !importCRMTabData.step4.statuses.validRecords)
          }
          endIcon={
            isLoading ? (
              <CircularProgress sx={{ color: Colors.white }} size={20} />
            ) : importCRMTabData.step === 4 ? (
              <CheckIcon />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
          onClick={handleAction}
          variant="contained"
          size="small"
        >
          {importCRMTabData.step === 4 ? 'Confirm' : 'Continue'}
        </Button>
      </Box>
    </Box>
  );
};
