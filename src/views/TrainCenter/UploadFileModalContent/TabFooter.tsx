import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CircularProgress, Button, Box } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { UploadFileModalDataType } from '../type';

import { addFieldPost } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setModalData: React.Dispatch<React.SetStateAction<UploadFileModalDataType>>;
  setIsTrainsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: UploadFileModalDataType;
};

export const TabFooter = ({ setIsTrainsChanged, setModalData, setOpenModal, modalData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadField = async () => {
    setIsLoading(true);
    try {
      await addFieldPost({
        columnMappings: modalData.step2.columnMappings!.map(
          (item: { simulacrumType: string; originalName: string }) => {
            return { simulacrumType: item.simulacrumType, originalName: item.originalName };
          },
        ),
        campaignId: modalData.step3.campaignId || null,
        importId: modalData.step1.importId || '',
      });
      setIsLoading(false);
      setIsTrainsChanged(true);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async () => {
    try {
      if (modalData.step === 3) {
        await uploadField();
        return;
      }
      if (modalData.step < 3) {
        setModalData({ ...modalData, step: modalData.step + 1 });
      }
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    }
  };

  const handlePrevious = () => {
    setModalData({ ...modalData, step: modalData.step - 1 });
  };

  const canGoStep3 =
    modalData.step2.columnMappings &&
    modalData.step2.columnMappings.find(
      (element: { simulacrumType: string }) => element.simulacrumType === 'ai',
    ) &&
    modalData.step2.columnMappings.find(
      (element: { simulacrumType: string }) => element.simulacrumType === 'human',
    );

  return (
    <Box sx={{ justifyContent: 'flex-end', display: 'flex', width: '100%', gap: '16px' }}>
      {modalData.step > 1 && (
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
      <Box sx={{ justifyContent: 'flex-end', display: 'flex', width: '165px' }}>
        <Button
          disabled={
            !modalData.step1.isFileUploaded ||
            isLoading ||
            (modalData.step === 2 && !canGoStep3) ||
            (modalData.step === 3 && !modalData.step3.reflectionType) ||
            (modalData.step === 3 &&
              modalData.step3.reflectionType === 'campaign' &&
              !modalData.step3.campaignId)
          }
          endIcon={
            isLoading ? (
              <CircularProgress sx={{ color: Colors.white }} size={20} />
            ) : modalData.step === 3 ? (
              <AutoAwesomeIcon />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
          onClick={handleAction}
          variant="contained"
          size="small"
        >
          {modalData.step === 3 ? 'Start Training' : 'Continue'}
        </Button>
      </Box>
    </Box>
  );
};
