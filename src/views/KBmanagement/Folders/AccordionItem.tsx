import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Accordion,
  Tooltip,
  Box,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { SyntheticEvent, useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useKBManagementContext } from '../KBManagementContext';
import { KBFilesTable } from '../KBFilesTable';
import { StatusType } from '../types';

import { Colors } from '/src/globalStyles/colors';

const addBtnStyles = {
  '&:hover': {
    color: Colors.simulacrumPrimary,
  },
  transition: 'all 0.3s',
  color: Colors.black,
  padding: '6px',
};

type Props = {
  folder: {
    documents: {
      commitStatus: StatusType;
      fileRealName: string;
      documentId: string;
      fileName: string;
    }[];
    groupName: string;
    groupId: string;
  };
};

export const AccordionItem = ({ folder }: Props) => {
  const { setSelectedFolder, setOpenModal } = useKBManagementContext();

  const [expanded, setExpanded] = useState(false);
  const addIconRef = useRef(null);

  const handleChange = () => (event: SyntheticEvent, isExpanded: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (addIconRef.current && addIconRef.current.contains(event.target)) {
      return;
    }
    setExpanded(isExpanded);
  };

  const handleUpdateSource = () => {
    setSelectedFolder(folder);
    setOpenModal(true);
  };

  return (
    <Accordion
      sx={{
        border: `1px solid ${Colors.inputBorder + 50}`,
        borderRadius: '8px',
        padding: '8px 4px',
      }}
      onChange={handleChange()}
      expanded={expanded}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon sx={{ fontSize: '36px' }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '16px',
            display: 'flex',
            width: '100%',
          }}
        >
          <Typography>{folder.groupName}</Typography>
          <Box ref={addIconRef}>
            <Tooltip title={'Add File'}>
              <IconButton onClick={handleUpdateSource} sx={addBtnStyles} size="large">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <KBFilesTable documents={folder.documents} />
      </AccordionDetails>
    </Accordion>
  );
};
