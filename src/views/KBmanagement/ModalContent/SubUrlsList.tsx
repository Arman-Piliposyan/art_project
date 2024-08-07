import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Box } from '@mui/material';
import React from 'react';

import { useKBManagementContext } from '../KBManagementContext';
import { ISubUrl } from '../types';

import { Colors } from '/src/globalStyles/colors';

export const SubUrlsList = () => {
  const { setSubUrls, subUrls } = useKBManagementContext();

  const handleDeleteSubUrl = (id: number) => {
    setSubUrls(subUrls.filter((subUrl: ISubUrl) => subUrl.id !== id));
  };

  return (
    <>
      {subUrls &&
        subUrls.map((urlData: ISubUrl) => {
          return (
            <Box
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                display: 'flex',
                gap: '8px',
              }}
            >
              <TextField placeholder="Domain name" value={urlData.subUrl} size="small" fullWidth disabled />
              <DeleteIcon
                sx={{
                  '&:hover': {
                    color: Colors.invalidRed,
                  },
                  cursor: 'pointer',
                  height: '24px',
                  width: '24px',
                }}
                onClick={() => handleDeleteSubUrl(urlData.id)}
              />
            </Box>
          );
        })}
    </>
  );
};
