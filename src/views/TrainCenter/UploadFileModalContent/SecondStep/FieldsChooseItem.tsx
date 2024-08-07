import { SelectChangeEvent, FormControl, Typography, MenuItem, Select, Box } from '@mui/material';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import React, { useState } from 'react';

import { UploadFileModalDataType } from '../../type';

import { CommonModal } from '/src/common/components/UI-Components/CommonModal';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  columnData: { sampleValues: string[]; simulacrumType: string; originalName: string };
  setModalData: React.Dispatch<React.SetStateAction<UploadFileModalDataType>>;
  modalData: UploadFileModalDataType;
  index: number;
};

export const FieldsChooseItem = ({ setModalData, columnData, modalData, index }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    if (!event.target.value) {
      setOpenModal(true);
      return;
    }

    setModalData({
      ...modalData,
      step2: {
        ...modalData.step2,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        columnMappings: [
          ...modalData.step2.columnMappings!.slice(0, index),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { ...modalData.step2?.columnMappings![index], simulacrumType: event.target.value },
          ...modalData.step2.columnMappings!.slice(index + 1),
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                modalData.step2.columnMappings[index].simulacrumType === 'not_mapped'
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            value={modalData.step2.columnMappings[index].simulacrumType || ''}
            onChange={handleChange}
            id="demo-simple-select"
          >
            {modalData.defaultFieldsOptions.map((option: { label: string; value: string }) => {
              return (
                <MenuItem
                  disabled={
                    option.value !== 'not_mapped' &&
                    !!modalData.step2.columnMappings!.find(
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
    </Box>
  );
};
