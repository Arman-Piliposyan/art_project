import { CircularProgress, IconButton, TextField, Checkbox, Tooltip, Box } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { useKBManagementContext } from '../KBManagementContext';
import { SubUrlsList } from './SubUrlsList';

import { getSubUrls } from '/src/services/walleService';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

const extractSubUrlsIconStyles = {
  '&[disabled]': {
    border: `1px solid ${Colors.placeholderColor}`,
    backgroundColor: Colors.placeholderColor + 10,
    color: Colors.placeholderColor,
  },
  '&:hover': {
    backgroundColor: Colors.simulacrumPrimary,
    color: Colors.white,
  },
  border: `1px solid ${Colors.simulacrumPrimary}`,
  color: Colors.simulacrumPrimary,
  transition: 'all 0.3s',
  borderRadius: '4px',
  margin: '3px 0px',
  padding: '4px',
  height: '40px',
  width: '40px',
};

export const UrlScrapTab = () => {
  const { setCheckedOnlyOneUrl, checkedOnlyOneUrl, setSubUrls, setMineUrl, mineUrl } =
    useKBManagementContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleGetSubUrls = async () => {
    setIsLoading(true);
    try {
      const { data } = await getSubUrls(mineUrl);
      setSubUrls(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setMineUrl(event.target.value);
  };

  const handleChangeOnlyOneUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedOnlyOneUrl(event.target.checked);
  };

  return (
    <Box sx={{ padding: '24px 0 0 0' }}>
      <Box
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          gap: '12px',
        }}
      >
        <Tooltip title={'Only this URL'}>
          <Checkbox
            sx={{ '& .MuiSvgIcon-root': { fontSize: '32px' } }}
            onChange={handleChangeOnlyOneUrl}
            checked={checkedOnlyOneUrl}
          />
        </Tooltip>
        <TextField
          sx={{ width: 'calc(100% - 40px)' }}
          onChange={handleChangeUrl}
          autoComplete="off"
          value={mineUrl}
          label="URL*"
          size="small"
        />
        <IconButton
          disabled={!mineUrl || isLoading || checkedOnlyOneUrl}
          sx={extractSubUrlsIconStyles}
          onClick={handleGetSubUrls}
          size="medium"
        >
          {isLoading ? (
            <CircularProgress sx={{ color: Colors.white }} size={20} />
          ) : (
            <ArrowCircleDownIcon fontSize="inherit" />
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          ...ScrollBarStylesGenerator('210px'),
          flexDirection: 'column',
          marginTop: '16px',
          display: 'flex',
          gap: '16px',
        }}
      >
        {!checkedOnlyOneUrl && <SubUrlsList />}
      </Box>
    </Box>
  );
};
