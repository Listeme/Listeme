import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import TextField from "@mui/material/TextField";
import { Box } from '@mui/system';
import './FeedPage.css';
import { ListItemButton } from '@mui/material';
import { ListItemText } from '@mui/material';



const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    violet: createColor('#BC00A3'),

  },
});


function FeedPage() {


  return (
    <div className="FeedPage">

      {/* <Stack direction="row" spacing={4} justifyContent="center"> */}


        <ThemeProvider theme={theme}>
          <Button color="violet" position="sticky" variant="contained" >Feed</Button>
          <Button color="violet" position="sticky" variant="contained">Pomodoro</Button>
          <Button color="violet" position="sticky" variant="contained">Journal</Button>
          <Button color="violet" position="sticky" variant="contained">Calendar</Button>
          <Button color="violet" position="sticky" variant="contained">Notes</Button>
          <Button color="violet" position="sticky" variant="contained">Tasks</Button>
        </ThemeProvider>
      {/* </Stack> */}
      <div>
        {/* <Stack direction="row" justifyContent="center"> */}
          <div>
            <div>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Task1" />
              </ListItemButton>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Task2" />
              </ListItemButton>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Task3" />
              </ListItemButton>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Task4" />
              </ListItemButton>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Task5" />
              </ListItemButton>

            </div>
          </div>
          <div className="calendar">
            <CalendarComponent id="calendar" />
          </div>

          <div className="reorg">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-static"
                label="Note"
                multiline
                rows={10}


              />
            </Box>
          </div>

        {/* </Stack> */}

      </div>
    </div>


  );
}

export default FeedPage;
