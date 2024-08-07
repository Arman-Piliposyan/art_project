import { Box } from '@mui/material';
import React from 'react';

import { AccordionItem } from './AccordionItem';
import { IFolder } from '../types';

import { ScrollBarStylesGenerator } from '/src/utils';

type Props = { allDocuments: IFolder[] | null };

export const Folders = ({ allDocuments }: Props) => {
  return (
    <Box
      sx={{
        ...ScrollBarStylesGenerator('calc(100% - 120px)'),
        paddingBottom: '2px',
        paddingRight: '6px',
      }}
    >
      <Box sx={{ flexDirection: 'column', display: 'flex', gap: '16px' }}>
        {allDocuments &&
          allDocuments.map((folder) => {
            return <AccordionItem key={folder.groupId} folder={folder} />;
          })}
      </Box>
    </Box>
  );
};
