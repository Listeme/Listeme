import React, { useContext, useEffect } from 'react';
import Set from './components/Set'
import './App.css';
import { SettingContext } from './context/SettingContext';
import Button from './components/Button';
import CountdownAnimation from './components/CountdownAnimation';


function App() {
  const {pomodoro, executing, setCurrentTimer, SettingBtn, children, startAnimate, 
    startTimer, pauseTimer, updateExecute} = useContext(SettingContext)

  useEffect(() => updateExecute(executing), [executing, startAnimate, updateExecute])
  return (
    <div className="container">
      <h1>Pomodoro</h1>
      {pomodoro !== 0 ?
        <Set /> :
        <>
          <ul className="Labels">
            <li>
              <Button
                title="Work"
                activeClass={executing.active === 'work' && 'active-label'}
                _callback={() => setCurrentTimer('work')} 
              />
            </li>
            <li>
              <Button
                title="Break"
                activeClass={executing.active === 'break' && 'active-label'}
                _callback={() => setCurrentTimer('break')} 
              />
            </li>
          </ul>
          <Button title="Setting" _callback={SettingBtn}/>
          <div className="time-container">
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
          <div className='button-wrapper'>
            <Button title="Start" className={!startAnimate && 'active'} _callback={startTimer}/>
            <Button title="Pause" className={startAnimate && 'active'} _callback={pauseTimer}/>
            <Button title="Stop" className={startAnimate && 'active'} _callback={startTimer}/>
          </div>
        </>
      }
    </div>
    
  );
}

export default App;
