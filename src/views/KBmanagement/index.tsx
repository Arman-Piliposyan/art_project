import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Typography, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useKBManagementContext } from './KBManagementContext';
import { ModalContent } from './ModalContent';
import { ShowFilePage } from './ShowFilePage';
import { Folders } from './Folders';
import { IFolder } from './types';

import { LayoutLoader } from '/src/common/components/UI-Components/LayoutLoader';
import { CommonModal } from '/src/common/components/UI-Components/CommonModal';
import { EmptyContent } from '/src/common/components/EmptyContent';
import { getAllDocuments } from '/src/services/walleService';

const KBmanagement = () => {
  const { knowledgeBaseUpdated, setOpenModal, openModal, shownFile } = useKBManagementContext();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [allDocuments, setAllDocuments] = useState<IFolder[] | null>(null);

  const handleAddNewDataSource = () => {
    setOpenModal(true);
  };

  const getDocuments = async () => {
    try {
      const { data } = await getAllDocuments();
      setAllDocuments(data);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await getDocuments();
      } catch (error) {
        console.error(error);
        toast.error('Fail');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knowledgeBaseUpdated]);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          padding: '4px 8px',
          height: '100%',
        }}
      >
        {isPageLoading ? (
          <LayoutLoader />
        ) : shownFile ? (
          <ShowFilePage />
        ) : (
          <>
            <Typography sx={{ mb: '16px' }} fontSize={26}>
              Knowledge base management
            </Typography>
            <Box
              sx={{
                justifyContent: 'space-between',
                marginBottom: '22px',
                display: 'flex',
              }}
            >
              <Button
                endIcon={<CreateNewFolderIcon />}
                onClick={handleAddNewDataSource}
                variant="contained"
                color="primary"
                size="small"
              >
                Add New Data Source
              </Button>
            </Box>
            {allDocuments?.length ? (
              <Folders allDocuments={allDocuments} />
            ) : (
              <EmptyContent text="There is nothing to show" />
            )}
          </>
        )}
      </Box>
      <CommonModal modalContent={<ModalContent />} setOpenModal={setOpenModal} open={openModal} />
    </>
  );
};

export default KBmanagement;
