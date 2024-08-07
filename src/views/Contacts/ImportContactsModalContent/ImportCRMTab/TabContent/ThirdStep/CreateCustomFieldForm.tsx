import {
  FormControlLabel,
  CircularProgress,
  FormControl,
  Typography,
  RadioGroup,
  TextField,
  FormLabel,
  Button,
  Radio,
  Box,
} from '@mui/material';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useImportContactsContext } from '../../../ImportContactsContext';
import { FieldTypesIcons } from './constant';

import { createCustomFieldsType } from '/src/services/contactsService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
};

export const CreateCustomFieldForm = ({ setOpenModal, index }: Props) => {
  const {
    customFieldsTypesOptions,
    setDefaultFieldsOptions,
    defaultFieldsOptions,
    setImportCRMTabData,
    importCRMTabData,
  } = useImportContactsContext();

  const [isLoading, setIsLoading] = useState(false);
  const [customFieldData, setCustomFieldData] = useState<{
    length: number | string;
    defaultValue: boolean;
    label: string;
    type: string;
  }>({
    defaultValue: false,
    type: 'text',
    length: '',
    label: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomFieldData({
      ...customFieldData,
      defaultValue: (event.target as HTMLInputElement).value === 'checked' ? true : false,
    });
  };

  const handleChangeLength = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (Number(event.target.value) > 80) {
      return;
    }
    setCustomFieldData({ ...customFieldData, length: Number(event.target.value) });
  };

  const handleChangeLabel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCustomFieldData({ ...customFieldData, label: event.target.value });
  };

  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    setCustomFieldData({ ...customFieldData, type: event.currentTarget.id, length: '', label: '' });
  };

  const handleCreateCustomField = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await createCustomFieldsType({
        ...customFieldData,
        defaultValue: customFieldData.type !== 'checkbox' ? null : customFieldData.defaultValue,
        length: customFieldData.type === 'checkbox' ? '' : customFieldData.length,
      });

      setDefaultFieldsOptions([...defaultFieldsOptions, { label: data.label, value: data.key }]);
      setImportCRMTabData({
        ...importCRMTabData,
        step3: {
          ...importCRMTabData.step3,
          columnMappings: [
            ...importCRMTabData.step3.columnMappings.slice(0, index),
            { ...importCRMTabData.step3.columnMappings[index], simulacrumType: data.key },
            ...importCRMTabData.step3.columnMappings.slice(index + 1),
          ],
        },
      });
      toast.success('Success');
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.reason);
        return;
      }
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', width: '100%', gap: '16px' }}>
      <Box
        sx={{
          borderBottom: `1px solid ${Colors.inputBorder}`,
          justifyContent: 'center',
          alignItems: 'center',
          padding: '14px 12px',
          display: 'flex',
        }}
      >
        <Typography fontWeight={500}>Add Custom Field</Typography>
      </Box>
      <Box sx={{ padding: '0 16px 16px 16px', display: 'flex', width: '100%', gap: '16px' }}>
        <Box sx={{ flexDirection: 'column', display: 'flex', width: '50%', gap: '6px' }}>
          <Typography fontSize={12}>Select Field Type</Typography>
          <Box
            sx={{
              border: `1px solid ${Colors.inputBorder}`,
              flexDirection: 'column',
              borderRadius: '6px',
              display: 'flex',
            }}
          >
            {customFieldsTypesOptions.map((option: { label: string; value: string }) => {
              return (
                <Box
                  sx={{
                    backgroundColor:
                      option.value === customFieldData.type ? Colors.paperBackgroundColor : 'white',
                    color:
                      option.value === customFieldData.type ? Colors.simulacrumPrimary : Colors.inputBorder,
                    alignItems: 'center',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    padding: '10px',
                    display: 'flex',
                    gap: '6px',
                  }}
                  onClick={handleSelect}
                  key={option.value}
                  id={option.value}
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {FieldTypesIcons[option.value]}
                  <Typography color={'inherit'} fontSize={14}>
                    {option.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box sx={{ flexDirection: 'column', display: 'flex', width: '50%', gap: '16px', pt: '24px' }}>
          <TextField
            value={customFieldData.label}
            onChange={handleChangeLabel}
            label="Display Label*"
            autoComplete="off"
            size="small"
            fullWidth
          />
          {customFieldData.type !== 'checkbox' ? (
            <TextField
              value={customFieldData.length}
              onChange={handleChangeLength}
              label="Field Length*"
              autoComplete="off"
              type="number"
              size="small"
              fullWidth
            />
          ) : (
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Default Value</FormLabel>
              <RadioGroup
                value={customFieldData.defaultValue ? 'checked' : 'unchecked'}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleChange}
                row
              >
                <FormControlLabel control={<Radio />} value={'checked'} label="checked" />
                <FormControlLabel control={<Radio />} value={'unchecked'} label="unchecked" />
              </RadioGroup>
            </FormControl>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          padding: '0 16px 16px 16px',
          justifyContent: 'flex-end',
          display: 'flex',
          width: '100%',
          gap: '16px',
        }}
      >
        <Button
          onClick={() => setOpenModal(false)}
          endIcon={<CloseIcon />}
          variant="contained"
          color="secondary"
          size="small"
        >
          Cancel
        </Button>
        <Button
          disabled={
            isLoading ||
            (customFieldData.type !== 'checkbox'
              ? !customFieldData.label
              : !customFieldData.label && !customFieldData.length)
          }
          endIcon={
            isLoading ? (
              <CircularProgress sx={{ color: Colors.white }} size={20} />
            ) : (
              <ControlPointOutlinedIcon />
            )
          }
          onClick={handleCreateCustomField}
          variant="contained"
          color="primary"
          size="small"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};
