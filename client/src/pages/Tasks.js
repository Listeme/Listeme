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
import Button from '@mui/material/Button';

function createData(name, due, notes) {
  return { name, due, notes };
}

const rows = [
  createData('Finish Listeme', 'February 8th', 'None'),
  createData('Eat Spaghetti', 'February 9th', 'Spaghetti Arts'),
  createData('Become Epic', 'None', 'CSC301 Lec 3'),
];

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e.target.value);
  }

  render() {
    const id = this.props.id;
    const label = this.props.label;
    return (
      <TextField
        id={id}
        label={label}
        defaultValue=""
        variant="standard"
        onChange={this.handleChange} />
    );
  }
}

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', date: '', notes: 'None' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNameChange(name) {
    this.setState({ name, date: this.state.date, notes: this.state.notes });
  }

  handleDateChange(date) {
    this.setState({ name: this.state.name, date, notes: this.state.notes });
  }

  handleNotesChange(notes) {
    this.setState({ name: this.state.name, date: this.state.date, notes });
  }

  handleClick() {
    this.props.onClick(this.state.name, this.state.date, this.state.notes);
  }

  render() {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          <Button variant="text" onClick={() => {
            this.handleClick();
          }}>Add Task</Button>
          <TextInput id="task_name" label="Add Task" handleChange={this.handleNameChange} />
        </TableCell>
        <TableCell align="right"> <TextInput id="due_date" label="Due Date" handleChange={this.handleDateChange} />
        </TableCell>
        <TableCell align="right"> <TextInput id="notes" label="Notes" handleChange={this.handleNotesChange} />
        </TableCell>
      </TableRow>
    );
  }
}

class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tasks: rows};
    this.updateTasks = this.updateTasks.bind(this);
  }

  updateTasks(name, due, notes) {
    this.setState({tasks: this.state.tasks.concat(createData(name, due, notes))});
  }

  render() {
    const tasks = this.state.tasks;
    const update = this.updateTasks;

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
              {tasks.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row"><Checkbox color="success" />{row.name}</TableCell>
                  <TableCell align="right">{row.due}</TableCell>
                  <TableCell align="right">{row.notes}</TableCell>
                </TableRow>
              ))}
              <AddTask onClick={update}/>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    );
  }
}

export default function Tasks() {
  return (
    <TaskList />
  );
}