import { Typography, IconButton, Tooltip, Box } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TablePagination from '@mui/material/TablePagination';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { tableCellEllipsisStyles, deleteIconStyles, contextColumns, showIconStyles } from './constants';
import { useKBManagementContext } from '../KBManagementContext';
import { StatusCellComponent } from './StatusCellComponent';
import { StatusType, IDocument } from '../types';

import { CommonDialog } from '/src/common/components/UI-Components/CommonDialog';
import { deleteDocument } from '/src/services/walleService';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  documents: {
    commitStatus: StatusType;
    fileRealName: string;
    documentId: string;
    fileName: string;
  }[];
};

export const KBFilesTable = ({ documents }: Props) => {
  const { setKnowledgeBaseUpdated, knowledgeBaseUpdated, setShownFile } = useKBManagementContext();

  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(0);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [sortedByUp, setSortedByUp] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [fileForDelete, setFileForDelete] = useState<IDocument | null>(null);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleShowFile = (row: IDocument) => {
    if (row.documentId) {
      setShownFile(row);
    }
  };

  const handleDeleteFile = async () => {
    if (!fileForDelete || !fileForDelete.documentId || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await deleteDocument(fileForDelete.documentId);
      setKnowledgeBaseUpdated(!knowledgeBaseUpdated);
      toast.success('Success');
      handleCloseDialog();
      setFileForDelete(null);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDeleteDialog = (row: IDocument) => {
    handleOpenDialog();
    setFileForDelete(row);
  };

  const handleCloseDialog = () => {
    if (!isOpenDialog) {
      return;
    }
    setIsOpenDialog(false);
  };

  const handleOpenDialog = () => {
    if (isOpenDialog) {
      return;
    }
    setIsOpenDialog(true);
  };

  const handleSortByUp = () => {
    setIsSorted(true);
    setSortedByUp(true);
  };

  const handleSortByDown = () => {
    setSortedByUp(false);
  };

  const handleUnSort = () => {
    setIsSorted(false);
  };

  const sortingCallback = (item1: IDocument, item2: IDocument) => {
    return item1.fileRealName.toLocaleLowerCase() > item2.fileRealName.toLocaleLowerCase()
      ? sortedByUp
        ? 1
        : -1
      : item2.fileRealName.toLocaleLowerCase() > item1.fileRealName.toLocaleLowerCase()
      ? sortedByUp
        ? -1
        : 1
      : 0;
  };

  const filesData = [...documents];
  const initialData = [...documents];
  const tableData = (isSorted ? filesData.sort(sortingCallback) : initialData).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box>
      <>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                {contextColumns.map((column) => (
                  <TableCell
                    style={{
                      minWidth: column.minWidth,
                    }}
                    sx={{ padding: '8px' }}
                    align={column.align}
                    key={uuidv4()}
                  >
                    {column.label === 'Name' ? (
                      <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Box sx={{ marginRight: '12px' }}>{column.label}</Box>
                        <Box
                          sx={{
                            '&:hover': {
                              backgroundColor: Colors.placeholderColor,
                              color: Colors.white,
                            },
                            color: Colors.placeholderColor,
                            justifyContent: 'center',
                            transition: 'all 0.3s',
                            alignItems: 'center',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '20px',
                            display: 'flex',
                            height: '24px',
                            width: '24px',
                          }}
                        >
                          {isSorted ? (
                            sortedByUp ? (
                              <ArrowUpwardIcon
                                sx={{
                                  fontSize: 'inherit',
                                }}
                                onClick={handleSortByDown}
                              />
                            ) : (
                              <ArrowDownwardIcon
                                sx={{
                                  fontSize: 'inherit',
                                }}
                                onClick={handleUnSort}
                              />
                            )
                          ) : (
                            <ArrowUpwardIcon sx={{ fontSize: 'inherit' }} onClick={handleSortByUp} />
                          )}
                        </Box>
                      </Box>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    height: '40.8px',
                    padding: '8px',
                  }}
                  align="center"
                >
                  <Typography fontSize={'0.875rem'}>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => {
                return (
                  <TableRow role="checkbox" key={uuidv4()} tabIndex={-1}>
                    {contextColumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          style={{
                            width: column.id === 'commitStatus' ? '20%' : '',
                          }}
                          sx={{
                            ...tableCellEllipsisStyles,
                          }}
                          align={column.align}
                          key={uuidv4()}
                        >
                          {column.id === 'commitStatus' ? (
                            <StatusCellComponent value={value as StatusType} />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell sx={{ padding: '8px', width: '150px' }} align="center">
                      <Tooltip title="Show">
                        <span>
                          <IconButton
                            sx={{
                              marginRight: '16px',
                              height: '18px',
                              width: '18px',
                            }}
                            onClick={() => {
                              handleShowFile(row);
                            }}
                            disabled={row.commitStatus !== 'Completed'}
                            disableRipple
                          >
                            <VisibilityIcon sx={showIconStyles} />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <span>
                          <IconButton
                            onClick={() => {
                              if (isLoading) {
                                return;
                              }
                              handleOpenDeleteDialog(row);
                            }}
                            sx={{
                              height: '18px',
                              width: '18px',
                            }}
                            disabled={row.commitStatus !== 'Completed'}
                            disableRipple
                          >
                            <DeleteIcon sx={deleteIconStyles} />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            '&>div': {
              backgroundColor: 'white',
            },
          }}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 100]}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          count={filesData.length}
          component="div"
          page={page}
        />
      </>

      {isOpenDialog && (
        <CommonDialog
          dialogContent={
            fileForDelete ? (
              <Typography sx={{ wordWrap: ' break-word' }}>
                Are you sure you want to delete
                <span style={{ textDecoration: 'underline', margin: '0 5px' }}>
                  {fileForDelete?.fileRealName}
                </span>
                file
              </Typography>
            ) : (
              <Typography sx={{ wordWrap: ' break-word' }}>
                Are you sure you want to delete all Data
              </Typography>
            )
          }
          handleCloseDialog={handleCloseDialog}
          confirmAction={handleDeleteFile}
          confirmIcon={<DeleteIcon />}
          isOpenDialog={isOpenDialog}
          isLoading={isLoading}
          disabled={isLoading}
          buttonColor="error"
          confirmText="Yes"
          cancelText="No"
        />
      )}
    </Box>
  );
};
