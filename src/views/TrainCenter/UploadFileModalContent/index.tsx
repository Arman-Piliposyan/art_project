import React, { useState } from 'react';
import { Box } from '@mui/material';

import { UploadFileModalDataType } from '../type';
import { SecondStep } from './SecondStep';
import { FirstStep } from './FirstStep';
import { ThirdStep } from './ThirdStep';
import { TabFooter } from './TabFooter';
import { TabHeader } from './TabHeader';
import { OptionsType } from '..';

export const modalInitialData = {
  step1: { isFileUploaded: false, totalRecords: null, importId: null, file: null },
  step3: {
    reflectionType: '',
    campaignId: '',
  },
  step2: { columnMappings: null },
  defaultFieldsOptions: [],
  step: 1,
};

type Props = {
  setIsTrainsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  campaignsOptions: OptionsType[] | undefined | [];
};

export const UploadFileModalContent = ({ setIsTrainsChanged, campaignsOptions, setOpenModal }: Props) => {
  const [modalData, setModalData] = useState<UploadFileModalDataType>(modalInitialData);

  const generateTabContent = () => {
    switch (modalData.step) {
      case 1:
        return <FirstStep setModalData={setModalData} modalData={modalData} />;
      case 2:
        return <SecondStep setModalData={setModalData} modalData={modalData} />;
      case 3:
        return (
          <ThirdStep campaignsOptions={campaignsOptions} setModalData={setModalData} modalData={modalData} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <TabHeader modalData={modalData} />
      <Box sx={{ height: 'calc(100% - 72px)', padding: '16px 0', width: '100%' }}>{generateTabContent()}</Box>
      <TabFooter
        setIsTrainsChanged={setIsTrainsChanged}
        setModalData={setModalData}
        setOpenModal={setOpenModal}
        modalData={modalData}
      />
    </>
  );
};
