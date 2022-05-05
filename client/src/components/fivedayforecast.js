import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { add, format } from 'date-fns';

const dates = [
  {id: '1', day: Date()},
  {id: '2', day: add(new Date(), {days: 1})},
  {id: '3', day: add(new Date(), {days: 2})},
  {id: '4', day: add(new Date(), {days: 3})},
  {id: '5', day: add(new Date(), {days: 4})},
]


const columns = [
  { id: 'name', label: 'Mon', minWidth: 5 },
  { id: 'code', label: 'Tues', minWidth: 5 },
  {
    id: 'population',
    label: 'Wed',
    minWidth: 5
  },
  {
    id: 'size',
    label: 'Thurs',
    minWidth: 5
  },
  {
    id: 'density',
    label: 'Fri',
    minWidth: 5
  },
];


function createData(name, code, population, size, density) {
  return { name, code, population, size, density };
}

const rows = [
  createData('Phase', 'Phase', 'Phase', '', 'Fly'),
];

export default function FiveDayForecast() {

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440}}>
        <Table stickyHeader aria-label="sticky table" sx={{backgroundColor: 'lightgray'}}>
          <TableHead>
            <TableRow >
              {dates.map((date) => (
                <TableCell
                  key={date.id}
                  align={date.align}
                  style={{ minWidth: date.minWidth, backgroundColor: '#3b3a38', color:'white' }}
                >
                  <b>{format(new Date(date.day), 'EEEE')}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}