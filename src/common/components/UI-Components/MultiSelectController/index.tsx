import { FormHelperText, SxProps, alpha } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Controller } from 'react-hook-form';
import Select from '@mui/material/Select';
import * as React from 'react';

import { Colors } from '/src/globalStyles/colors';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

type option = {
  value: string | number;
  title?: string;
  label: string;
};

type Props = {
  defaultValue?: string | number;
  size?: 'medium' | 'small';
  dataTestId?: string;
  disabled?: boolean;
  multiple?: boolean;
  fieldName: string;
  options: option[];
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  sx?: SxProps;
};

export const MultiSelectController = ({
  multiple = false,
  disabled = false,
  size = 'small',
  dataTestId,
  fieldName,
  control,
  options,
  label,
}: Props) => {
  const renderValue = (value: string) => {
    const option = options.find((option) => option.value === value);
    if (option?.label.slice(0, 3) === 'Add') {
      return option.label.slice(4);
    }
    return option?.label;
  };

  return (
    <Controller
      render={({ field: { onChange, value, name }, formState: { errors } }) => {
        let currentValue;
        if (multiple) {
          currentValue = Array.isArray(value) ? value : [];
        } else {
          currentValue = value ? (Array.isArray(value) ? value[0] : value) : '';
        }
        return (
          <FormControl fullWidth>
            <InputLabel
              size={size === 'small' ? size : 'normal'}
              id="select-helper-label"
              error={!!errors[name]}
            >
              {label}
            </InputLabel>
            <Select
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: Colors.white,
                  borderWidth: '1px',
                },
                '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(Colors.placeholderColor, 0.5),
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: Colors.simulacrumPrimary,
                },
                '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                  borderColor: Colors.invalidRed,
                },
              }}
              renderValue={multiple ? undefined : renderValue}
              labelId="select-helper-label"
              data-test-id={dataTestId}
              error={!!errors[name]}
              MenuProps={MenuProps}
              value={currentValue}
              multiple={multiple}
              disabled={disabled}
              onChange={onChange}
              label={label}
              size={size}
            >
              {options.map((option: option) => (
                <MenuItem value={option.value} title={option.title} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ margin: '4px 0 0 0', fontSize: '10px' }} error={!!errors[name]}>
              {errors[name] && errors[name]?.message}
            </FormHelperText>
          </FormControl>
        );
      }}
      control={control}
      name={fieldName}
    />
  );
};
