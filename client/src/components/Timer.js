import { React, useContext, useEffect, useState} from 'react';
import { SettingContext } from '../context/SettingContext';
import Button from './Button';
import useSound from 'use-sound';
import clicksound from "./clicksound.mp3";
import CountdownAnimation from './CountdownAnimation';
import './Timer.css';
import {
  ChakraProvider,
  Flex,
} from '@chakra-ui/react';
import theme from '../theme';
import ToggleColorMode from './ColorMode';

function Timer() {
  const {pomodoro, executing, setCurrentTimer, children, startAnimate, 
    startTimer, pauseTimer, updateExecute} = useContext(SettingContext)
  const [play] = useSound(clicksound, {
    sprite: {in: [200, 500]},
    volume: 0.3});

  useEffect(() => updateExecute(executing), [executing, startAnimate, updateExecute])
  const [newTimer, setNewTimer] = useState({
      work: 20.00,
      break: 10.00,
      active: 'work'
  })


  const handleChange = input => {
      const {name, value} = input.target
      switch (name) {
          case 'work':
              setNewTimer({
                  ...newTimer,
                  work: parseInt(value)
              })

              break;

          case 'break':
              setNewTimer({
                  ...newTimer,
                  break: parseInt(value)
              })

              break;
          
          default:
              break;
      }
      console.log(newTimer)
  }

  const handleSubmit = e => {
    e.preventDefault()
    updateExecute(newTimer)
  }
  
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection="row" justifyContent="flex-end">
        <ToggleColorMode justifySelf="end" />
      </Flex>
      <Flex flexDirection="row" justifyContent="flex-start" alignItems="center" minH="80vh">
        <Flex flexDirection="column" justifyContent="center" alignItems="center" alignContent= "center" minH="80vh">
            
        </Flex>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" aligncontent="center" minH="80vh">
          <div className="container">
            <ul className="labels">
              <li>
                <Button 
                  title="Work" 
                  activeClass={executing.active === 'work' ? 'active-label' : undefined} 
                  _callback={() => {
                    play({id: executing.active === 'work' ? "in" : "in"}); 
                    setCurrentTimer('work');
                  }} 
                />
              </li>
              <li>
                <Button 
                  title="Break" 
                  activeClass={executing.active === 'break' ? 'active-label' : undefined} 
                  _callback={() => {
                    play({id: executing.active === 'work' ? "in" : "in"}); 
                    setCurrentTimer('break')}} 
                />
              </li>
            </ul>
          </div>
          <form noValidate onSubmit={handleSubmit}>
            <ul className="labels">
              <div className="active-label">
                  <input className="input-wrapper" name="work" onChange={handleChange} value={newTimer.work}/>
                  <input className="input-wrapper" name="break" onChange={handleChange} value={newTimer.break}/>
              </div>
            </ul>
              <div className='settimer-wrapper'>
                <div className='set-label'>
                  <button type='submit'>Set Timer</button>
                </div>
              </div>
            
          </form>
          <div className="timer-container">
            <div className="time-wrapper">
                <CountdownAnimation
                  key={pomodoro} 
                  timer={pomodoro} 
                  animate={startAnimate}
                >
                  {children}
                </CountdownAnimation>
            </div>
          </div>
          <div className="button-wrapper">
            <div className='active-label'>
              <Button title="Start" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
              <Button title="Pause" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
            </div>
          </div>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default Timer;
