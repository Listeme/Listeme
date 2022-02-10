import React, { createContext, useState } from 'react';

export const SettingContext = createContext()
function SettingContextProvider(props) {

    const [pomodoro, setPomodoro] = useState(0)
    const [executing, setExecuting] = useState({})
    const [startAnimate, setStartAnimate] = useState(false)

    
    function startTimer(){
        setStartAnimate(true)
    }
    function pauseTimer(){
        setStartAnimate(false)
    }
    function stopTimer(){
        setStartAnimate(false)
    }

    const SettingBtn = () => {
        setExecuting({})
        setPomodoro(0)
    }
    function setCurrentTimer(active_state){
        updateExecute({
            ...executing,
            active: active_state
        })
        setTimerTime(executing)
    }


    const updateExecute = updatedSetting => {
        setExecuting(updatedSetting)
        setTimerTime(updatedSetting)
    }

    const setTimerTime = evaluate  => {
        switch (evaluate.active){
            case 'work':
                setPomodoro(evaluate.work)

                break;
            case 'break':
                setPomodoro(evaluate.break)

                break;
            
            default:
                setPomodoro(0)
                break;
        }
    }

    const children = ({remainingTime}) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60

        return `${minutes}m: ${seconds}s`
    }

    function stopAnimate(){
        setStartAnimate(false)
    }

    return (
    <SettingContext.Provider 
    value={{
        stopTimer, 
        updateExecute,
        pomodoro,
        executing,
        startAnimate,
        startTimer,
        pauseTimer,
        SettingBtn,
        setCurrentTimer,
        children,
        stopAnimate
        }}>
        {props.children}
    </SettingContext.Provider>
    )
  
};

export default SettingContextProvider
