import { CircularProgress, Typography, TextField, Button, Tabs, Box, Tab } from '@mui/material';
import React, { SyntheticEvent, ChangeEvent, useState } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { toast } from 'react-toastify';

import { useKBManagementContext } from '../KBManagementContext';
import { CustomTabPanel } from './CustomTabPanel';
import { UploadFileTab } from './UploadFileTab';
import { UrlScrapTab } from './UrlScrapTab';
import { allProps } from '../helpers';

import {
  createScrapDocuments,
  updateScrapDocuments,
  createDocument,
  updateFolder,
} from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

export const ModalContent = () => {
  const {
    setKnowledgeBaseUpdated,
    knowledgeBaseUpdated,
    checkedOnlyOneUrl,
    selectedFolder,
    setOpenModal,
    setSubUrls,
    setFiles,
    mineUrl,
    subUrls,
    files,
  } = useKBManagementContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataSourceName, setDataSourceName] = useState(selectedFolder?.groupName || '');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleChangeSourceName = (event: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setDataSourceName(event.target.value);
  };

  const handleUploadClick = async () => {
    setIsLoading(true);

    const formData = new FormData();

    for (const file of Array.from(files)) {
      formData.append('documents', file as File);
    }
    if (!selectedFolder) {
      formData.append('groupName', dataSourceName);
    }

    try {
      if (!selectedFolder) {
        await createDocument(formData);
      } else {
        updateFolder({ groupId: selectedFolder.groupId, data: formData });
      }
      toast.success('Success');
      setTimeout(() => {
        setKnowledgeBaseUpdated(!knowledgeBaseUpdated);
      }, 1000);
      setFiles(null);
      setOpenModal(false);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.detail.message);
        setError(error.response.data.detail.message);
      } else {
        toast.error('Fail');
      }
      setIsLoading(false);
    }
  };

  const handleScrapClick = async () => {
    setIsLoading(true);
    const mineUrlData = {
      subUrl: mineUrl,
      id: 0,
    };
    try {
      if (!selectedFolder) {
        await createScrapDocuments({
          subUrls: checkedOnlyOneUrl ? [mineUrlData] : subUrls,
          groupName: dataSourceName,
        });
      } else {
        updateScrapDocuments({
          subUrls: checkedOnlyOneUrl ? [mineUrlData] : subUrls,
          groupId: selectedFolder.groupId,
        });
      }
      toast.success('Success');
      setTimeout(() => {
        setKnowledgeBaseUpdated(!knowledgeBaseUpdated);
      }, 1000);
      setSubUrls(null);
      setOpenModal(false);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.detail.message);
        setError(error.response.data.detail.message);
      } else {
        toast.error('Fail');
      }
    }
  };

  const handleSubmit = () => {
    if (selectedTab === 0) {
      handleUploadClick();
    }
    if (selectedTab === 1) {
      handleScrapClick();
    }
    return;
  };

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        width: '450px',
        gap: '24px',
      }}
    >
      <Typography fontWeight={500} fontSize={22}>
        Add New Data Source
      </Typography>
      <TextField
        onChange={handleChangeSourceName}
        disabled={!!selectedFolder}
        label="Data Source Name*"
        value={dataSourceName}
        autoComplete="off"
        helperText={error}
        error={!!error}
        size="small"
        fullWidth
      />
      <Box>
        <Typography fontSize={16}>Data Source Type</Typography>
        <Box sx={{ borderColor: 'divider', borderBottom: 1 }}>
          <Tabs onChange={handleChange} value={selectedTab} aria-label="tabs">
            <Tab label="File" {...allProps(0)} />
            <Tab label="Url" {...allProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={selectedTab} index={0}>
          <UploadFileTab />
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={1}>
          <UrlScrapTab />
        </CustomTabPanel>
      </Box>
      <Box sx={{ justifyContent: 'flex-end', display: 'flex', width: '100%' }}>
        <Button
          disabled={
            !dataSourceName ||
            (selectedTab === 0 && !files) ||
            (selectedTab === 1 && (checkedOnlyOneUrl ? !mineUrl : !subUrls?.length)) ||
            isLoading
          }
          endIcon={isLoading ? <CircularProgress sx={{ color: Colors.white }} size={20} /> : <SaveAltIcon />}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="small"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
