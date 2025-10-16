//useAudioClick.js

import { useRef } from 'react';

const useAudioClick = (src) => {
  const audioRef = useRef(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn('Audio play blocked:', err.message);
      });
    }
  };

  return { audioRef, play };
};

export default useAudioClick;