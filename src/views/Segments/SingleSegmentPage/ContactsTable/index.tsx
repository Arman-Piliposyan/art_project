/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Typography, IconButton, Tooltip, Box } from '@mui/material';
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

import { tableCellEllipsisStyles, contactsColumns, showIconStyles } from '../../constants';
import { ContactSideBarContent } from './ContactSideBarContent';
import { useSegmentsContext } from '../../SegmentsContext';
import { ContactType } from '../../types';

import { getSingleContact } from '/src/services/contactsService';
import { SideBar } from '/src/common/components/SideBar';

export const ContactsTable = () => {
  const {
    singleSegmentData: { contacts },
  } = useSegmentsContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContactData, setSelectedContactData] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  //@ts-ignore
  const handleOpenDrawer = async (rowInfo) => {
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
        {/* {isTableLoading ? <TableLoader /> : <></>} */}
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                {contactsColumns.map((column) => (
                  <TableCell
                    style={{
                      minWidth: column.minWidth,
                    }}
                    sx={{ padding: '8px' }}
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
                  <Typography fontSize={'0.875rem'}>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              {contacts!.map((row: ContactType) => {
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
        {/* <Box
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
        </Box> */}
      </>
      <SideBar toggleDrawer={toggleDrawer} isOpen={isDrawerOpen}>
        {selectedContactData && <ContactSideBarContent contactData={selectedContactData} />}
      </SideBar>
    </Box>
  );
};
