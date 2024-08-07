import {
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
  Pagination,
  TextField,
  Divider,
  Box,
} from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';

import { useKBManagementContext } from '../KBManagementContext';
import { ChunkModalContent } from './ChunkModalContent';
import { IFileChunksData, IFileChunk } from '../types';

import { CommonModal } from '/src/common/components/UI-Components/CommonModal';
import { getFileChunks } from '/src/services/walleService';
import { useDebouncedValue } from '/src/hooks/useDebounce';
import { useDidUpdate } from '/src/hooks/useDidUpdate';
import { ScrollBarStylesGenerator } from '/src/utils';
import { Colors } from '/src/globalStyles/colors';

export const ShowFilePage = () => {
  const { setShownFile, shownFile } = useKBManagementContext();

  const [selectedChunk, setSelectedChunk] = useState<IFileChunk | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [fileChunks, setFileChunks] = useState<IFileChunksData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const debouncedSearchValue = useDebouncedValue(searchValue);
  const debouncedPage = useDebouncedValue(page);

  const handleChangeSearchValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleGoBack = () => {
    setShownFile(null);
  };

  const handleClickOnChunk = (item: IFileChunk) => {
    setSelectedChunk(item);
  };

  const getFile = async () => {
    setIsLoading(true);
    try {
      const { data } = await getFileChunks({
        documentId: shownFile.documentId,
        content: searchValue,
        page: page,
      });
      setFileChunks(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (openModal || !selectedChunk) {
      return;
    }
    setSelectedChunk(null);
  }, [openModal]);

  useEffect(() => {
    if (!selectedChunk) {
      return;
    }
    setOpenModal(true);
  }, [selectedChunk]);

  useEffect(() => {
    (async () => {
      await getFile();
    })();
  }, [debouncedPage]);

  useDidUpdate(() => {
    (async () => {
      if (page === 1) {
        await getFile();
        return;
      }
      setPage(1);
    })();
  }, [debouncedSearchValue]);

  return (
    <>
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          overflowX: 'auto',
          display: 'flex',
          gap: '16px',
        }}
      >
        <Box
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
            pt: '6px',
          }}
        >
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <IconButton onClick={handleGoBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography fontSize={24}>{shownFile?.fileRealName}</Typography>
          </Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChangeSearchValue}
            sx={{ width: '60%' }}
            value={searchValue}
            autoComplete="off"
            label="Search"
            size="small"
          />
        </Box>
        <Box
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            height: 'calc(100vh - 196px)',
            padding: '6px',
            width: '100%',
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                width: '100%',
              }}
            >
              <CircularProgress sx={{ color: Colors.simulacrumPrimary }} size={30} />
            </Box>
          ) : (
            <Box
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '8px',
                display: 'flex',
                width: '100%',
                ...ScrollBarStylesGenerator('100%'),
              }}
            >
              {fileChunks?.chunks.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <Box
                      sx={{
                        '&:hover': {
                          backgroundColor: Colors.paperBackgroundColor,
                        },
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        p: '24px 16px',
                        width: '100%',
                      }}
                      onClick={() => {
                        handleClickOnChunk(item);
                      }}
                    >
                      <Typography fontSize={14}>{item.content}</Typography>
                    </Box>
                    <Divider
                      sx={{
                        borderColor: Colors.lightGray,
                        width: '100%',
                      }}
                    />
                  </Fragment>
                );
              })}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: Colors.white + 15,
            padding: '4px 4px 8px 8px',
            justifyContent: 'flex-end',
            display: 'flex',
            width: '100%',
          }}
        >
          <Pagination
            count={fileChunks?.totalPages}
            onChange={handleChange}
            variant="outlined"
            boundaryCount={2}
            siblingCount={0}
            showFirstButton
            color="primary"
            shape="rounded"
            showLastButton
            size="small"
            page={page}
          />
        </Box>
      </Box>
      {openModal && (
        <CommonModal
          modalContent={
            <ChunkModalContent
              selectedChunk={selectedChunk}
              setFileChunks={setFileChunks}
              setOpenModal={setOpenModal}
            />
          }
          setOpenModal={setOpenModal}
          withOutCloseIcon
          open={openModal}
          width="800px"
          padding="0"
        />
      )}
    </>
  );
};
