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

  function createData(name, due, notes) {
    return { name, due, notes };
  }
  
  const rows = [
    createData('Finish Listeme', 'February 8th', 'None'),
    createData('Eat Spaghetti', 'February 9th', 'Spaghetti Arts'),
    createData('Become Epic', 'None', 'CSC301 Lec 3'),
  ];

  class TaskName extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    render() {
      return (
        <TextField
          id="task_name"
          label="Add Task"
          defaultValue=""
          variant="standard" />
      );
    }
  }

  class DueDate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    render() {
      return (
        <TextField
          id="due_date"
          label="Due Date"
          defaultValue=""
          variant="standard" />
      );
    }
  }

  class Notes extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    render() {
      return (
        <TextField
          id="notes"
          label="Notes"
          defaultValue=""
          variant="standard" />
      );
    }
  }

  function AddTask(props) {
    return (
      <TableRow>
        <TableCell component="th" scope="row"> <TaskName />
        </TableCell>
        <TableCell align="right"> <DueDate />
        </TableCell>
        <TableCell align="right"> <Notes />
        </TableCell>
      </TableRow>
    );
  }
  
  function Tasklist(props) {
    return (
      <div className='Tasks-header'>
        <div className='Tasks-spacer'>
          Taskbar goes here
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Tasklist">
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
                  <TableCell component="th" scope="row"><Checkbox color="success" />{row.name}</TableCell>
                  <TableCell align="right">{row.due}</TableCell>
                  <TableCell align="right">{row.notes}</TableCell>
                </TableRow>
              ))}
              <AddTask />
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    );
  }

  export default function Tasks() {
    return (
      <Tasklist />
    );
  }