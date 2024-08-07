/* eslint-disable @typescript-eslint/ban-ts-comment */
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Pagination, Box } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

import { contactsColumns } from './constants';
import { TableLoader } from './TableLoader';
import { ContactsDataType } from '..';

import { Colors } from '/src/globalStyles/colors';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: ContactsDataType | null;
  isTableLoading: boolean;
  page: number;
};

export const ContactsTable = ({ isTableLoading, setPage, data, page }: Props) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <>
        {isTableLoading ? <TableLoader /> : <></>}
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                {contactsColumns.map((column) => (
                  <TableCell
                    style={{
                      minWidth: column.minWidth,
                      width: column.minWidth,
                      fontFamily: 'Poppins',
                      fontWeight: '600px',
                    }}
                    sx={{ padding: '8px' }}
                    align={column.align}
                    key={uuidv4()}
                  >
                    {column.label}
                  </TableCell>
                ))}
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
                            color:
                              column.id === 'status'
                                ? value === 'valid'
                                  ? Colors.successGreen
                                  : value === 'invalid'
                                  ? Colors.invalidRed
                                  : value === 'duplicate'
                                  ? Colors.warning
                                  : ''
                                : '',
                            minWidth: column.minWidth,
                            width: column.minWidth,
                            fontFamily: 'Poppins',
                          }}
                          align={column.align}
                          key={uuidv4()}
                        >
                          {column.id === 'status'
                            ? value === 'valid'
                              ? 'Valid'
                              : value === 'invalid'
                              ? 'Import error'
                              : value === 'duplicate'
                              ? 'Already in contact list'
                              : value
                            : value}
                        </TableCell>
                      );
                    })}
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
    </Box>
  );
};
