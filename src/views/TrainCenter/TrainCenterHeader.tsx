import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { InputAdornment, TextField, MenuItem, Button, Box } from '@mui/material';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

import { FilterByOptions } from './contsants';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  setFilterBy: React.Dispatch<React.SetStateAction<'organization' | 'campaign' | 'all'>>;
  setIsUploadFile: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  filterBy: 'organization' | 'campaign' | 'all';
  isLoadingGetCampaigns: boolean;

  searchValue: string;
};

export const TrainCenterHeader = ({
  isLoadingGetCampaigns,
  setIsUploadFile,
  setSearchValue,
  setOpenModal,
  setFilterBy,
  searchValue,
  filterBy,
}: Props) => {
  const handleSelectFilterBy = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFilterBy(event.target.value as 'organization' | 'campaign' | 'all');
  };

  const handleChangeSearchValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleOpenUploadFile = () => {
    setIsUploadFile(true);
    setOpenModal(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: Colors.paperBackgroundColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        display: 'flex',
        width: '100%',
        p: '12px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChangeSearchValue}
          sx={{ width: '400px' }}
          value={searchValue}
          autoComplete="off"
          label="Search"
          size="small"
          fullWidth
        />
        <TextField
          onChange={handleSelectFilterBy}
          sx={{ width: '300px' }}
          label="Filter By"
          value={filterBy}
          size="small"
          select
        >
          {FilterByOptions.map((option: { label: string; value: string }) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ display: 'flex', width: '280px', gap: '16px' }}>
        <Button
          sx={{
            '&:hover': {
              backgroundColor: Colors.simulacrumPrimary,
              color: Colors.white,
            },
            color: Colors.simulacrumPrimary,
            height: '40px',
          }}
          endIcon={<UploadOutlinedIcon />}
          disabled={isLoadingGetCampaigns}
          onClick={handleOpenUploadFile}
          variant="outlined"
          type="submit"
          fullWidth
        >
          Upload
        </Button>
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => setOpenModal(true)}
          disabled={isLoadingGetCampaigns}
          sx={{ height: '40px' }}
          variant="contained"
          color="primary"
          size="small"
          fullWidth
        >
          Add New
        </Button>
      </Box>
    </Box>
  );
};
