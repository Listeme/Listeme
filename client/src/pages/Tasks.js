import './Tasks.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useFormControl } from '@mui/material/FormControl';

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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >           
                <TableCell component="th" scope="row"><Checkbox color="success"/>{row.name}</TableCell>
                <TableCell align="right">{row.due}</TableCell>
                <TableCell align="right">{row.notes}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row"> <TextField
                id="add_task"
                label="Add Task"
                defaultValue=""
                variant="standard"/>    
              </TableCell>
              <TableCell align="right"> <TextField
                id="due_date"
                label="Due Date"
                defaultValue=""
                variant="standard"/>    
              </TableCell>
              <TableCell align="right"> <TextField
                id="notes"
                label="Notes"
                defaultValue=""
                variant="standard"/>    
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
  }