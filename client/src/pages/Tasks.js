import './Tasks.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, due, notes) {
    return { name, due, notes };
  }
  
  const rows = [
    createData('Finish Listeme', 'February 8th', 'None'),
    createData('Eat Spaghetti', 'February 9th', 'Spaghetti Arts'),
    createData('Become Epic', 'None', 'CSC301 Lec 3'),
  ];
  
  export default function Tasks() {
    return (
    <div className='Tasks-header'>
        <div className='Tasks-spacer'>
            Taskbar goes here
        </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, bgcolor: 'primary.main' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: 'primary.main' }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.due}</TableCell>
                <TableCell align="right">{row.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
  }