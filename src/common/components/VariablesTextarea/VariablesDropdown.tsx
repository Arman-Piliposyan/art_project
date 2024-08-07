import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Typography, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React from 'react';

interface IVariable {
  actionOnRequiredMissed: number | null;
  variableOnConfirm: number | null;
  isConfirmable: boolean;
  reminderText: string;
  confirmText: string;
  description: string;
  isRequired: boolean;
  typeId: string;
  value: string;
  name: string;
  mode: number;
  id?: string;
}

type Props = {
  options: { label: string; value: string }[] | [];
  handleSelectChange: (value: string) => void;
};

export const VariablesDropdown = ({ handleSelectChange, options }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (value: string) => {
    handleClose();
    handleSelectChange(value);
  };

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          width: 'max-content',
          display: 'flex',
          padding: '4px',
        }}
        onClick={handleClick}
      >
        <Typography sx={{ fontSize: '12px' }}>Choose variable</Typography>
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Box>
      <Menu
        sx={{
          '& .MuiPaper-root': {
            paddingRight: '0px !important',
            minWidth: '150px',
          },
          top: '24px',
          left: '3px',
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        onClose={handleClose}
        anchorEl={anchorEl}
        open={open}
      >
        {options.map((option) => {
          return (
            <MenuItem
              onClick={() => {
                handleClickItem(option.label);
              }}
              title={option.label}
              key={option.value}
            >
              <span
                style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  maxWidth: '200px',
                }}
              >
                {option.label}
              </span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
