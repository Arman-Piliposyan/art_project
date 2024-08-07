import { CircularProgress, LinearProgress, Typography, IconButton, Button, Box } from '@mui/material';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// import { useImportContactsContext, importCSVTabInitialData } from '../../../ImportContactsContext';
import createAxiosInstance from '../../../../api/axios';
import { UploadFileModalDataType } from '../../type';
import { modalInitialData } from '..';

import { WALLE_BASE_URL } from '/src/constants/envVarables';
import { deleteFile } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';
import { CSVWhiteSmall } from '/src/assets';

type Props = {
  setModalData: React.Dispatch<React.SetStateAction<UploadFileModalDataType>>;
  modalData: UploadFileModalDataType;
};

export const UploadFileSection = ({ setModalData, modalData }: Props) => {
  // const { setImportCSVTabData, importCSVTabData } = useImportContactsContext();

  const { step1, step2 } = modalData;

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!step1.file) return;
    const formData = new FormData();
    formData.append('train_file', step1.file);
    setUploading(true);
    setProgress(0);
    try {
      const { data } = await createAxiosInstance().post(
        `${WALLE_BASE_URL}/api/v1/ai-train/train-file-preview`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total!) * 100;
            if (progress === 100) {
              setIsLoading(true);
            }

            setProgress(progress);
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setModalData({
        ...modalData,
        step1: { ...step1, importId: data.importId, isFileUploaded: true },
        step2: { ...step2, columnMappings: data.columnMappings },
        defaultFieldsOptions: data.simulacrumTypes,
      });
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.reason);
        return;
      }
      toast.error('Fail');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteUploadedFile = async () => {
    try {
      setIsLoading(true);
      await deleteFile(step1.importId as string);
      setModalData(modalInitialData);
      toast.success('Success');
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {step1.file ? (
        <Box
          sx={{
            backgroundColor: Colors.paperBackgroundColor,
            padding: '16px 16px 8px 16px',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '8px',
            display: 'flex',
            width: '100%',
            gap: '8px',
          }}
        >
          <Box
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              width: '100%',
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '16px',
              }}
            >
              <Box
                sx={{
                  backgroundColor: step1.isFileUploaded ? Colors.successGreen : Colors.simulacrumPrimary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '8px',
                  display: 'flex',
                  height: '42px',
                  width: '42px',
                }}
              >
                {step1.isFileUploaded ? (
                  <DoneIcon sx={{ color: 'white' }} fontSize="large" />
                ) : (
                  <CSVWhiteSmall />
                )}
              </Box>
              <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-ignore */}
                <Typography>{step1.file.name}</Typography>
              </Box>
            </Box>
            {!uploading && !step1.isFileUploaded ? (
              <Button
                endIcon={<UploadFileOutlinedIcon />}
                onClick={handleUpload}
                variant="contained"
                // disabled={isLoading || disabled}
                size="small"
              >
                Upload
              </Button>
            ) : isLoading ? (
              <CircularProgress sx={{ color: Colors.simulacrumPrimary }} size={30} />
            ) : step1.isFileUploaded ? (
              <IconButton
                sx={{
                  height: '18px',
                  width: '18px',
                }}
                onClick={handleDeleteUploadedFile}
                disableRipple
              >
                <DeleteOutlineIcon
                  sx={{
                    '&:hover': {
                      color: Colors.invalidRed,
                    },
                    cursor: 'pointer',
                  }}
                />
              </IconButton>
            ) : null}
          </Box>

          <Box sx={{ width: '100%' }}>
            {(uploading || step1.isFileUploaded) && (
              <Box
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  display: 'flex',
                  width: '100%',
                  gap: '8px',
                }}
              >
                <LinearProgress
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: step1.isFileUploaded ? Colors.successGreen : '',
                    },
                    // backgroundColor: 'white',
                    width: '96%',
                  }}
                  value={step1.isFileUploaded ? 100 : progress}
                  variant="determinate"
                  // value={progress}
                />
                <span>{step1.isFileUploaded ? 100 : progress.toFixed(0)}%</span>
              </Box>
            )}
          </Box>
        </Box>
      ) : null}
    </>
  );
};
