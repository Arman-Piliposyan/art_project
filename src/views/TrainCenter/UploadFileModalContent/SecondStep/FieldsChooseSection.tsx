import { Box } from '@mui/material';
import React from 'react';

import { FieldsChooseItem } from './FieldsChooseItem';
import { UploadFileModalDataType } from '../../type';

import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setModalData: React.Dispatch<React.SetStateAction<UploadFileModalDataType>>;
  modalData: UploadFileModalDataType;
};

export const FieldsChooseSection = ({ setModalData, modalData }: Props) => {
  const { step2 } = modalData;

  return (
    <Box
      sx={{
        border: `1px solid ${Colors.placeholderColor}`,
        height: 'calc(100% - 72px)',
        borderRadius: '6px',
        padding: '4px',
      }}
    >
      <Box
        sx={{
          ...ScrollBarStylesGenerator('100%'),
        }}
      >
        {step2.columnMappings!.map(
          (
            column: { sampleValues: string[]; simulacrumType: string; originalName: string },
            index: number,
          ) => {
            return (
              <FieldsChooseItem
                setModalData={setModalData}
                modalData={modalData}
                columnData={column}
                index={index}
                key={index}
              />
            );
          },
        )}
      </Box>
    </Box>
  );
};
