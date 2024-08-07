import { Box } from '@mui/material';
import React from 'react';

import { useImportContactsContext } from '../../../ImportContactsContext';
import { FieldsChooseItem } from './FieldsChooseItem';

import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export const FieldsChooseSection = () => {
  const {
    importCRMTabData: { step3 },
  } = useImportContactsContext();

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
        {step3.columnMappings.map(
          (
            column: { sampleValues: string[]; simulacrumType: string; originalName: string },
            index: number,
          ) => {
            return <FieldsChooseItem columnData={column} index={index} key={index} />;
          },
        )}
      </Box>
    </Box>
  );
};
