import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import * as React from 'react';

import { Colors } from '/src/globalStyles/colors';

type option = {
  value: string | number;
  label: string;
};

type Props = {
  defaultValue?: string | number;
  disabledEnterKey?: boolean;
  size?: 'medium' | 'small';
  multiline?: boolean;
  disabled?: boolean;
  fieldName: string;
  options: option[];
  minRows?: number;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
};

export const CreatableSelectController = ({
  disabledEnterKey = false,
  multiline = false,
  disabled = false,
  size = 'small',
  options = [],
  minRows = 1,
  fieldName,
  control,
  label,
}: Props) => {
  const handleDisableEnterKey = (event: React.KeyboardEvent) => {
    if (disabledEnterKey && event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <Controller
      render={({ field: { onChange, value, name }, formState: { errors } }) => {
        return (
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={errors[name] && errors[name]?.message}
                onKeyDown={handleDisableEnterKey}
                error={!!errors[name]}
                multiline={multiline}
                onChange={onChange}
                disabled={disabled}
                minRows={minRows}
                value={value}
                label={label}
                size={size}
              />
            )}
            inputValue={(() => {
              const currentOption = options.find((option) => {
                if (Array.isArray(value) ? option.value === value[0] : option.value === value) {
                  return option;
                }
              });

              return value
                ? currentOption
                  ? currentOption.label
                  : Array.isArray(value)
                  ? value[0]
                  : value
                : '';
            })()}
            onChange={(e) => {
              const input = e.target as HTMLElement;
              const selectedOption = options.find((option) => option.label === input.innerText);

              if (selectedOption) {
                onChange(selectedOption.value);
                return;
              }
              onChange(input.innerText);
            }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: Colors.white,
                borderWidth: '1px',
              },
            }}
            value={value ? (Array.isArray(value) ? value[0] : value) : ''}
            disableClearable={true}
            options={options}
            freeSolo
          />
        );
      }}
      control={control}
      name={fieldName}
    />
  );
};
