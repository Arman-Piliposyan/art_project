import { Box } from '@mui/material';
import React from 'react';

import { FieldsChooseSection } from './FieldsChooseSection';
import { UploadFileModalDataType } from '../../type';
import { StepHeader } from './StepHeader';

type Props = {
  setModalData: React.Dispatch<React.SetStateAction<UploadFileModalDataType>>;
  modalData: UploadFileModalDataType;
};

export const SecondStep = ({ setModalData, modalData }: Props) => {
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
      <StepHeader />
      <FieldsChooseSection setModalData={setModalData} modalData={modalData} />
    </Box>
  );
};
