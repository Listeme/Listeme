import useSound from 'use-sound';
import React, {useState} from 'react';

const Sound = () => {
    const tick = './clock-ticking-1.mp3';

    const [play, { stop }] = useSound(
        tick,
        { volume: 0.5 }
      );
    const [isHovering, setIsHovering] = React.useState(false);
};

export default Sound
