//AudioLoad.jsx

import { useEffect, useRef } from 'react';


const AudioLoad = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log('Autoplay blocked:', err.message);
      });
    }
  }, []);


  return (
    <audio
      ref={audioRef}
      src="/CINEMATIC INTRO.mp3" // <-- path relative to public folder root
      preload="auto"
      loop={false}
    />
  );
};

export default AudioLoad;