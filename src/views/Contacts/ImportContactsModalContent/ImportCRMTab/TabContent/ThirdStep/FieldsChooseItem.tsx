import { SelectChangeEvent, FormControl, Typography, MenuItem, Select, Box } from '@mui/material';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import React, { useState } from 'react';

import { useImportContactsContext } from '../../../ImportContactsContext';
import { CreateCustomFieldForm } from './CreateCustomFieldForm';

import { CommonModal } from '/src/common/components/UI-Components/CommonModal';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  columnData: { sampleValues: string[]; simulacrumType: string; originalName: string };
  index: number;
};

export const FieldsChooseItem = ({ columnData, index }: Props) => {
  const { defaultFieldsOptions, setImportCRMTabData, importCRMTabData } = useImportContactsContext();

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    if (!event.target.value) {
      setOpenModal(true);
      return;
    }

    setImportCRMTabData({
      ...importCRMTabData,
      step3: {
        ...importCRMTabData.step3,
        columnMappings: [
          ...importCRMTabData.step3.columnMappings.slice(0, index),
          { ...importCRMTabData.step3.columnMappings[index], simulacrumType: event.target.value },
          ...importCRMTabData.step3.columnMappings.slice(index + 1),
        ],
      },
    });
  };

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${Colors.placeholderColor}`,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        padding: '8px',
        width: '100%',
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', width: '23%' }}>
        <Typography fontSize={12}>{columnData.originalName}</Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          width: '33%',
        }}
      >
        <FormControl sx={{ width: '90%' }} size="small">
          <Select
            sx={{
              backgroundColor:
                importCRMTabData.step3.columnMappings[index].simulacrumType === 'not_mapped'
                  ? '#fff8eb'
                  : Colors.paperBackgroundColor,
              '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 0,
              },
              '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                border: 0,
              },
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              boxShadow: 'none',
              fontSize: '12px',
            }}
            value={importCRMTabData.step3.columnMappings[index].simulacrumType || ''}
            onChange={handleChange}
            id="demo-simple-select"
          >
            <MenuItem
              sx={{
                '&:hover': {
                  color: Colors.simulacrumPrimary,
                },
                borderBottom: `1px solid ${Colors.simulacrumPrimary}`,
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                height: '34px',
                color: 'black',
                width: '100%',
              }}
              value={''}
            >
              <ControlPointOutlinedIcon sx={{ fontSize: '14px', color: 'inherit' }} />
              <Typography sx={{ ml: '6px' }} color={'inherit'} fontWeight={500} fontSize={12}>
                Add Custom Field
              </Typography>
            </MenuItem>
            {defaultFieldsOptions.map((option: { label: string; value: string }) => {
              return (
                <MenuItem
                  disabled={
                    option.value !== 'not_mapped' &&
                    !!importCRMTabData.step3.columnMappings.find(
                      (element: { simulacrumType: string }) => element.simulacrumType === option.value,
                    )
                  }
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                  }}
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          width: '43%',
        }}
      >
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '56ch',
          }}
          fontSize={12}
        >
          {columnData.sampleValues.toString()}
        </Typography>
      </Box>

      <CommonModal
        modalContent={<CreateCustomFieldForm setOpenModal={setOpenModal} index={index} />}
        setOpenModal={setOpenModal}
        withOutCloseIcon
        open={openModal}
        width="600px"
        padding="0"
      />
    </Box>
  );
};
