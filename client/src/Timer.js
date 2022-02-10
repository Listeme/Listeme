import React, { useContext, useEffect } from 'react';
import SetPomodoro from './components/SetPomodoro'
import { SettingContext } from './context/SettingContext';
import Button from './components/Button';
import CountdownAnimation from './components/CountdownAnimation';


function Timer() {
  const {pomodoro, executing, setCurrentTimer, SettingBtn, children, startAnimate, 
    startTimer, pauseTimer, updateExecute} = useContext(SettingContext)

  useEffect(() => updateExecute(executing), [executing, startAnimate, updateExecute])
  return (
    <div className="container">
      {pomodoro !== 0 ?
      <>
        <ul className="labels">
          <li>
            <Button 
              title="Work" 
              activeClass={executing.active === 'work' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('work')} 
            />
          </li>
          <li>
            <Button 
              title="Break" 
              activeClass={executing.active === 'break' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('break')} 
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
      </> : <SetPomodoro />}
    </div>
    
  );
}

export default Timer
