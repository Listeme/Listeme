import {React} from 'react';
import Timer  from '../components/Timer';
import PomoTasks from '../components/pomotask';
import GridLayout from "react-grid-layout";
import '../components/Timer.css';
import {
  Flex,
  Box,
  ChakraProvider,
} from '@chakra-ui/react';
import theme from '../theme';
import ToggleColorMode from '../components/ColorMode';
import PomoHistory from '../components/pomohistory';
import './FeedPage.css';

/*
make each task id a button to switch to a new timer (timer also needs to remember what the time set as based on id)
create pomodoro according to each task
update pomodoro according to each task
delete pomodoro according to each task
when click start in timer for work/break, it records the time to history as work/break
when pause in timer for work/break, it records the time to history as work/break
*/

function TimerPage() {
  const layout = [
    { i: "pomo", x: 0, y: 0, w: 3, h: 3 },
    { i: "timer", x: 3, y: 0, w: 3, h: 3 },
    { i: "history", x: 6, y: 0, w: 3, h: 3 }
  ];
  return (  
    <ChakraProvider theme={theme}>
      <Flex flexDirection="row" justifyContent="flex-end">
        <ToggleColorMode justifySelf="end" />
      </Flex>
      <GridLayout
          className="layout"
          layout={layout}
          cols={10}
          rowHeight={visualViewport.height}
          width={visualViewport.width}
          compactType={null}
        >
          <Box key="pomo">
            <PomoTasks/>
          </Box>
          <Box key="timer">
            <Timer/>
          </Box>
          <Box key="history">
            <PomoHistory/>
          </Box>
      </GridLayout>
    </ChakraProvider>
    
  );
}

export default TimerPage;
