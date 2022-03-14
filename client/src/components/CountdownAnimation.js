import React, { useContext } from 'react';
import { CountdownCircleTimer} from 'react-countdown-circle-timer'
import { SettingContext } from '../context/SettingContext';

const CountdownAnimation = ({key = 1, timer = 20, animate = true, children}) => {
    const {stopTimer, ticking} = useContext(SettingContext)
    return (
    <CountdownCircleTimer
        key={key}
        isPlaying={animate}
        duration={ timer * 60}
        colors={[['#89f60b', 0.33]]}
        size={0}
        strokeWidth={1}
        trailColor="#159832"
        onUpdate={ () => {
            ticking()
        }}
        onComplete={ () => {
            stopTimer()
        }}
    >
        {children}

    </CountdownCircleTimer>
  )
};

export default CountdownAnimation
