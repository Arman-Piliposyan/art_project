import Select, { SelectChangeEvent } from '@mui/material/Select';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import * as React from 'react';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  options: { value: string; label: string }[];
  hasHardcodedValue: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFakeSelectsData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fakeSelectsData: any;
  placeholder: string;
};

const MenuProps = {
  PaperProps: {
    style: {
      backgroundColor: Colors.white,
      padding: '8px 8px 8px 8px',
      borderRadius: '8px',
      width: 250,
    },
  },
};

export const CustomSelect = ({
  setFakeSelectsData,
  hasHardcodedValue,
  fakeSelectsData,
  placeholder,
  options,
}: Props) => {
  const [value, setValue] = React.useState<string>(hasHardcodedValue ? options[0].value : '');

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    setValue(value);
    setFakeSelectsData({ ...fakeSelectsData, [placeholder]: true });
  };

  return (
    <div>
      <FormControl sx={{ borderColor: Colors.white, width: '100%' }}>
        <InputLabel
          sx={{
            '&.MuiInputLabel-root ': {
              top: '-7px ',
            },
            '&.MuiFormLabel-filled': {
              top: '0 ',
            },
            backgroundColor: Colors.authContentBackgroundColor,
            paddingRight: '6px',
          }}
          id="demo-multiple-chip-label"
        >
          {placeholder}
        </InputLabel>
        <Select
          renderValue={(value) => (
            <Box>
              {
                <Tooltip key={uuidv4()} title={value}>
                  <Chip
                    avatar={
                      <AutoFixHighIcon
                        sx={{
                          transform: ' scaleX(-1)',
                          height: '10px',
                          width: '10px',
                        }}
                        style={{ color: Colors.colorPrimary }}
                        color="primary"
                      />
                    }
                    sx={{
                      backgroundColor: Colors.white,
                      borderRadius: '4px',
                    }}
                    color="warning"
                    label={value}
                    size="small"
                    key={value}
                  />
                </Tooltip>
              }
            </Box>
          )}
          sx={{
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(Colors.placeholderColor, 0.5),
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: Colors.white,
              borderWidth: '1px',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: Colors.invalidRed,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: Colors.colorPrimary,
            },
          }}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" size="small" fullWidth />}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          onChange={handleChange}
          MenuProps={MenuProps}
          value={value}
        >
          {options.map((option) => (
            <MenuItem
              sx={{
                '&:hover': {
                  backgroundColor: Colors.placeholderColor,
                },
                backgroundColor: alpha(Colors.placeholderColor, 0.5),
                wordBreak: 'break-all',
                transition: 'all 0.2s',
                borderRadius: '6px',
                color: Colors.black,
              }}
              value={option.value}
              key={option.value}
            >
              <AutoFixHighIcon
                sx={{
                  transform: ' scaleX(-1)',
                  paddingLeft: '8px',
                  height: '26px',
                  width: '26px',
                }}
                style={{ color: Colors.colorPrimary }}
                color="primary"
              />
              <Box sx={{ whiteSpace: 'normal', fontSize: '12px' }}>{option.label}</Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
