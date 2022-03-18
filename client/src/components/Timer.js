import { React, useContext, useEffect} from 'react';
import Set from './Set'
import { SettingContext } from '../context/SettingContext';
import useSound from 'use-sound';
import clicksound from "./clicksound.mp3";
import CountdownAnimation from './CountdownAnimation';
import './Timer.css';
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

function Timer() {
  const {pomodoro, executing, setCurrentTimer, SettingBtn, children, startAnimate,
    startTimer, pauseTimer, updateExecute} = useContext(SettingContext)
  const [play] = useSound(clicksound, {
    sprite: {in: [200, 500]},
    volume: 0.3});

  useEffect(() => updateExecute(executing), [executing, startAnimate, updateExecute])
  return (
    <Flex
      minHeight="100vh"
      width="full"
      justifyContent="center"
      alignItems="center">

      <div className="container">
        {pomodoro !== 0 ?
        <>
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
          <Button title="Settings" _callback={SettingBtn} />
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
            <Button title="Start" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
            <Button title="Pause" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
          </div>
        </> : <Set />}
      </div>
    </Flex>
  );
}

export default Timer;
