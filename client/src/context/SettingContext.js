import React, { createContext, useState } from 'react';
import useSound from 'use-sound';
import alarm from "../components/alarm-clock-01.mp3";
import clock from "../components/clock-ticking-1.mp3";
import clicksound from "../components/clicksound.mp3";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";

export const SettingContext = createContext()
function SettingContextProvider(props) {

    const [pomodoro, setPomodoro] = useState(0)
    const [executing, setExecuting] = useState({})
    const [startAnimate, setStartAnimate] = useState(false)
    const [play] = useSound(clicksound, {
        sprite: {in: [200, 500]},
        volume: 0.3});
    const [tick] = useSound(clock, {
        sprite: {in: [200, 500]},
        volume: 0.3,});
    const [loud] = useSound(alarm, {
        sprite: {in: [0, 500]},
        volume: 0.3,});

    
    function startTimer(){
        play({id: executing.active === 'start' ? "in" : "in"}); 
        tick({id: executing.active === 'start' ? "in": "in"}); 
        setStartAnimate(true)
    }
    function pauseTimer(){
        play({id: executing.active === 'pause' ? "in" : "in"}); 
        setStartAnimate(false)
    }
    function stopTimer(){
        loud({id: executing.active === 'start' ? "in" : "in"});
        setStartAnimate(false)
    }

    function ticking(){
        tick({id: executing.active === 'start' ? "in" : "in"});
    }

    const SettingBtn = () => {
        play({id: executing.active === 'setting' ? "in" : "in"}); 
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
        stopAnimate,
        ticking
        }}>
        {props.children}
    </SettingContext.Provider>
    )
  
};

export default SettingContextProvider
