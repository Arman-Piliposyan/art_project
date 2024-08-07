import { Box } from '@mui/material';
import React from 'react';

import { UploadFileSection } from './UploadFileSection';
import { UploadFileModalDataType } from '../../type';
import { InputTypeFile } from './InputTypeFile';

type Props = {
  setModalData: React.Dispatch<React.SetStateAction<UploadFileModalDataType>>;
  modalData: UploadFileModalDataType;
};

export const FirstStep = ({ setModalData, modalData }: Props) => {
  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', height: '100%', width: '100%' }}>
      <InputTypeFile setModalData={setModalData} modalData={modalData} key={Math.random()} />
      <UploadFileSection setModalData={setModalData} modalData={modalData} />
    </Box>
  );
};
