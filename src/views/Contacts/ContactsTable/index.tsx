/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Typography, IconButton, Pagination, Tooltip, Button, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { tableCellEllipsisStyles, contactsColumns, showIconStyles } from '../constants';
import { ContactSideBarContent } from './ContactSideBarContent';
import { ContactsDataType, ContactType } from '../types';
import { TableLoader } from './TableLoader';

import { getSingleContact } from '/src/services/contactsService';
import { SideBar } from '/src/common/components/SideBar';
import { Colors } from '/src/globalStyles/colors';

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: ContactsDataType | null;
  isTableLoading: boolean;
  page: number;
};

export const ContactsTable = ({ isTableLoading, setOpenModal, setPage, data, page }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedContactData, setSelectedContactData] = useState(null);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenCreationPage = () => {
    setOpenModal(true);
  };

  const handleOpenDrawer = async (rowInfo: ContactType) => {
    setIsLoading(true);
    try {
      const { data } = await getSingleContact(rowInfo.id);
      setSelectedContactData(data);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error(error);
      toast.error('Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <>
        <Box
          sx={{
            justifyContent: 'space-between',
            marginBottom: '32px',
            alignItems: 'center',
            display: 'flex',
            padding: '16px',
            width: '100%',
          }}
        >
          <Typography fontWeight={500} fontSize={22}>
            Contacts
          </Typography>
          <Button onClick={handleOpenCreationPage} variant="contained" size="small">
            + Import Contacts
          </Button>
        </Box>
        {isTableLoading ? <TableLoader /> : <></>}
        <TableContainer sx={{ maxHeight: 500, px: '16px' }}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                {contactsColumns.map((column) => (
                  <TableCell
                    style={{
                      minWidth: column.minWidth,
                    }}
                    sx={{ fontWeight: '600', padding: '8px' }}
                    align={column.align}
                    key={uuidv4()}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    padding: '12px',
                    height: '40px',
                  }}
                  align="center"
                >
                  <Typography fontSize={'0.875rem'} fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              {data!.items.map((row) => {
                return (
                  <TableRow key={uuidv4()} tabIndex={-1}>
                    {contactsColumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{
                            ...tableCellEllipsisStyles,
                          }}
                          align={column.align}
                          key={uuidv4()}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell sx={{ padding: '8px', width: '150px' }} align="center">
                      <Tooltip title="Show">
                        <span>
                          <IconButton
                            sx={{
                              height: '18px',
                              width: '18px',
                            }}
                            onClick={() => handleOpenDrawer(row)}
                            disabled={isLoading}
                            disableRipple
                          >
                            <VisibilityIcon sx={showIconStyles} />
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
        <Box
          sx={{
            backgroundColor: Colors.white + 15,
            justifyContent: 'flex-end',
            padding: '12px',
            display: 'flex',
            width: '100%',
          }}
        >
          <Pagination
            count={data?.totalPages}
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
      </>
      <SideBar toggleDrawer={toggleDrawer} isOpen={isDrawerOpen}>
        {selectedContactData && <ContactSideBarContent contactData={selectedContactData} />}
      </SideBar>
    </Box>
  );
};
