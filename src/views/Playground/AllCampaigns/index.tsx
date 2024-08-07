import { InputAdornment, TextField, Box } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';

import { CampaignsTable } from './CampaignsTable';
import { CampaignDataType } from '../types';

import { useDebouncedValue } from '/src/hooks/useDebounce';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  allCampaignData: CampaignDataType[];
};

export const AllCampaigns = ({ allCampaignData }: Props) => {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebouncedValue(searchValue);

  const handleChangeSearchValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // useDidUpdate(() => {
  //   (async () => {
  //     if (page === 1) {
  //       await getContacts();
  //       return;
  //     }
  //     setPage(1);
  //   })();
  // }, [debouncedSearchValue]);
  // const { setOpenModal } = useCampaignsContext();

  return (
    <>
      <Box
        sx={{
          backgroundColor: Colors.paperBackgroundColor,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '6px',
          display: 'flex',
          p: '12px 16px',
          mb: '16px',
        }}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChangeSearchValue}
          sx={{ width: '250px' }}
          value={searchValue}
          autoComplete="off"
          label="Search"
          size="small"
          fullWidth
        />
      </Box>
      <Box
        sx={{
          height: 'calc(100% - 80px)',
          flexDirection: 'column',
          display: 'flex',
          width: '100%',
          gap: '32px',
        }}
      >
        <CampaignsTable allCampaignData={allCampaignData} />
      </Box>
    </>
  );
};
